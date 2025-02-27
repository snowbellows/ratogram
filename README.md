# Ratogram

![Nonogram board with a playful rat emoji](./docs/illustrations/ratogram.svg)

An open source multiplayer game where you can solve nonograms with friends!

It's an entirely client-side app built using React + Typescript + Vite based on the [create-vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).

## Licence

See `./LICENCE` for full text of both licences.

### Code

Code for Ratogram Copyright 2025 by Alexis Halverson is licensed under the [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)

Ratogram is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Ratogram is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

### Visual Design and Documentation

Visual design for Ratogram Copyright 2025 by Alexis Halverson is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1)

This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms. CC BY-NC-SA includes the following elements:

- BY: credit must be given to the creator.
- NC: Only noncommercial uses of the work are permitted.
- SA: Adaptations must be shared under the same terms.

## Attribution

- 🎨 Code and visual design for the very cute emojis (including the rat!) redistributed and adapted in Ratogram are from [FxEmoji](https://github.com/mozilla/fxemoji) Copyright 2015 Mozilla foundation ditributed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0) for the code and [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) for the visual design.

## Development

```bash
    nvm use           # Pins node version if you're using nvm
    npm run install   # Install packages
    npm run dev       # Runs vite development server with hot reload
    npm run lint      # Runs eslint
    npm run preview   # Serves the built app in ./dist
    npm run test      # Runs vitest
    npm run coverage  # Runs vitest coverage
    npm run format    # Runs prettier
```

## Deploying to Production

### Expanding the ESLint configuration

The template recommends updating the configuration to enable type aware lint rules if you are developing a production application:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
