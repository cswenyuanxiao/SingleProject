# Peer Review Resource Center

## Project Overview

The Peer Review Resource Center is a comprehensive website designed to provide high-quality educational peer review resources, research, and tools. This project employs a warm parchment design theme, offering educators and researchers an intuitive and visually appealing interface to explore and utilize peer review content.

## Key Features

- **Comparison Analysis**: Multi-dimensional comparison of different review methods with visualizations including radar charts, heat maps, and bar charts
- **Time Series Analysis**: Trends in review quality over time with multiple chart types
- **Effective Feedback Examples**: Showcases high-quality peer review feedback samples including specific, actionable, balanced, and constructive feedback types
- **Influence Factors Analysis**: Exploration of key factors affecting peer review effectiveness
- **Suggestion Submission**: Allows users to submit ideas for improving peer review processes

## Technology Stack

- Hugo static site generator
- Bootstrap 5
- Chart.js for data visualization
- Font Awesome icons
- Custom CSS (parchment-theme.css)

## Installation & Local Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version recommended)
- [Node.js](https://nodejs.org/) (Version 16 or higher)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Setup Instructions

1. Clone this repository
   ```bash
   git clone https://github.com/cswenyuanxiao/SingleProject.git
   cd SingleProject
   ```

2. Install dependencies
   ```bash
   cd quickstart
   npm install
   ```

3. Run the site locally
   ```bash
   hugo server -D
   ```

4. Visit `http://localhost:1313/SingleProject/` in your browser

### Troubleshooting Common Issues

- If you encounter errors related to missing Hugo modules, run:
  ```bash
  hugo mod get -u
  ```

- If you need to clean the build cache:
  ```bash
  hugo --cleanDestinationDir
  ```

## Deployment

The site is automatically deployed to GitHub Pages through GitHub Actions whenever changes are pushed to the main branch.

You can access the live version at: https://cswenyuanxiao.github.io/SingleProject/

## Project Structure

```plaintext
├── content/              # Website content
│   ├── home/            # Homepage content
│   ├── comparison/      # Review method comparisons (charts, tables)
│   ├── factors/         # Factors influencing review effectiveness
│   ├── feedback/        # Example peer reviews & best practices
│   ├── suggestions/     # User-submitted suggestions & discussion
│   └── blog/            # Updates & research insights (optional)
│
├── layouts/             # Hugo page templates
│   ├── _default/        # Default templates for all pages
│   ├── comparison/      # Templates for comparison visualizations
│   ├── factors/         # Templates for factor analysis pages
│   ├── feedback/        # Templates for displaying feedback examples
│   ├── suggestions/     # Templates for suggestion submission & review
│   ├── shortcodes/      # Custom Hugo shortcodes (for rendering components)
│   └── partials/        # Shared UI components (header, footer, sidebar)
│
├── static/              # Static assets (CSS, JS, Images)
│   ├── css/             # Stylesheets
│   │   ├── custom.css   # Custom theme styles
│   │   └── parchment-theme.css # Parchment design theme
│   ├── js/              # JavaScript files (Chart.js, Search, etc.)
│   ├── images/          # Static images (logos, UI assets)
│
├── data/                # Optional: External data files (JSON, YAML)
│
└── config.toml          # Hugo configuration file
```

## Custom Theme

This project uses a custom parchment theme with the following characteristics:

- Warm beige/cream backgrounds
- Various brown tones for text and buttons
- Smooth transitions and hover effects
- Unified styling for cards, badges, and buttons
- High-contrast design for readability

To modify the theme, edit the `static/css/parchment-theme.css` file.

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contact

For any questions or suggestions, please contact us at:

- Email: 2715237x@student.gla.ac.uk
- GitHub Issues: [Create a new issue](https://github.com/cswenyuanxiao/SingleProject/issues/new)
