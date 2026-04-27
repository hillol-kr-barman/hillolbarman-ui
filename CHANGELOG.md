# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — Unreleased

### Added
- Initial package scaffold with TypeScript, tsup, and Vite
- CSS design token system (`tokens.css`) with shared and per-project override tokens
- Semantic type-scale utility classes (`type-scale.css`): `type-eyebrow`, `type-hero`, `type-page-title`, `type-section-title`, `type-card-title`, `type-body`, `type-body-strong`, `type-label`
- Component utility classes (`utilities.css`): `.btn`, `.btn-ghost`, `.badge`, `.card-panel`, `.card-panel-soft`, `.card-panel-tight`, `.section-header`, `.section-title`
- Combined `styles.css` entry point for single-import consumption
- Storybook configuration with dark background default
- CI workflow: type check and build on every push and pull request
- Publish workflow: automatic npm publish on version tag push
