const { google } = require('googleapis');

const defaultConfig = {
  maxResults: 3,
  filters:
    'ga:pagePath!@/tag/;ga:pagePath!@/page/;ga:pagePath!=/;ga:pageTitle!=(not set);ga:pagePath!@&',
  dates: { from: 'today', to: '2019-01-01' },
};

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  options
) => {
  try {
    const {
      viewId,
      email,
      filters,
      secretKey,
      maxResults,
      dates: { from, to },
    } = {
      ...options,
      ...defaultConfig,
      dates: { ...options.dates, ...defaultConfig.dates },
    };

    const auth = new google.auth.JWT(
      email,
      null,
      secretKey.replace(/\\n/gm, '\n'),
      ['https://www.googleapis.com/auth/analytics.readonly']
    );

    await auth.authorize();

    const res = await google.analytics('v3').data.ga.get({
      auth,
      filters,
      'end-date': from,
      'start-date': to,
      ids: `ga:${viewId}`,
      sort: '-ga:pageViews',
      metrics: 'ga:pageviews',
      'max-results': maxResults,
      dimensions: 'ga:pagePath,ga:pageTitle',
    });

    res.data.rows.forEach(([url, title, totalViews]) =>
      createNode({
        id: createNodeId(`MostReadPosts-${title}`),
        url,
        title,
        totalViews,
        internal: {
          type: `MostReadPosts`,
          contentDigest: createContentDigest({ url, title, totalViews }),
        },
      })
    );
  } catch (err) {
    console.info(err);
  }
};
