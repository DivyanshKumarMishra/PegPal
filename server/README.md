# Running Backend Server with Typescript

## Initialize the backend project

```
npm init -y
```

## Install Typescript in backend

```
npm i -D typescript @types/node tsx
```

## Create Root and Output directories

```
// all ts files reide inside src folder
mkdir src

// all compiled js files reside inside dist folder
mkdir dist
```

## Create `tsconfig.json` file

```
npx tsc --init
```

## Edit `tsconfig.json` file

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "CommonJS",
    "target": "ES2020",
    "lib": ["esnext"],
    "types": ["node"],
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force"
  }
}
```

## Install project dependencies

```
npm i bcrypt cors cookie-parser express jsonwebtoken dotenv
```

## Install type dependencies

```
npm i -D @types/bcrypt @types/cookie-parser @types/cors @types/express @types/jsonwebtoken
```

## Edit script in `package.json` file

```
scripts": {
  "dev": "tsx src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```