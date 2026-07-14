import { defineConfig } from 'kysely-codegen';

export default defineConfig({
    dialect: 'mysql',
    camelCase: true,
    outFile: 'src/db/db-types.ts',
    typeMapping: {
        date: 'string',
    },
});
