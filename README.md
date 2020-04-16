# Gatsby Source for Most Read Posts from Google Analytics

Get your most read Posts from Google Analytics Reporting API.

## Install

You can install this library via NPM or YARN.

### NPM

```bash
npm i @blackbox-vision/gatsby-source-google-analytics-api-most-read-posts
```

### YARN

```bash
yarn add @blackbox-vision/gatsby-source-google-analytics-api-most-read-posts
```

## Config

In your `gatsby-config.js`:

```javascript
{
    resolve: `@blackbox-vision/gatsby-source-google-analytics-api-most-read-posts`,
    options: {
        viewId: `115350264`,
        email: `example@domain.com`,
        secretKey: `yourSecretAPIKey`,
        maxResults: 10,
        filters: 'ga:pagePath!@/tag/;ga:pagePath!@/page/;ga:pagePath!=/;ga:pageTitle!=(not set);ga:pagePath!@&',
        dates: {
            from: 'today',
            to: '2019-01-01'
        }
    }
}
```

## Supported Options

| Properties | Types  | Default Value | Description                                                      |
| ---------- | ------ | ------------- | ---------------------------------------------------------------- |
| viewId     | string | none          | Your viewId for your Google Analytics property.                  |
| email      | string | none          | The email generated from the Google API Console.                 |
| secretKey  | string | none          | The PEM certificate generated from the Google API Console.       |
| maxResults | number | 3             | Total results to get from the source.                            |
| filters    | string | ''            | Filters for data from Google Analytics.                          |
| dates.from | string | 'today'       | A date formatted string or an string representing time relation. |
| dates.to   | string | '2019-01-01'  | A date formatted string or an string representing time relation. |

## Example Usage

```javascript
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const gplQuery = graphql`
  query GetAllMostReadPosts {
    allMostReadPosts {
      nodes {
        totalViews
        title
        url
      }
    }
  }
`;

export const MostReadPosts = () => (
  <StaticQuery
    query={gplQuery}
    render={({ allMostReadPosts: { nodes: posts } }) =>
      posts.map((post, idx) => (
        <div key={idx}>
          <a href={post.url}>
            <h2>{post.title}</h2>
          </a>
        </div>
      ))
    }
  />
);

MostReadPosts.displayName = 'MostReadPosts';
```

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/gatsby-source-analytics-most-read-posts/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/gatsby-source-analytics-most-read-posts/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/gatsby-source-analytics-most-read-posts/blob/master/LICENSE) for more information.
