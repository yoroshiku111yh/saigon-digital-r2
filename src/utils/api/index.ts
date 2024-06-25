const contentful = require("contentful");

const clientContentful = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: "master",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export async function getEntryById<T>(data: { id: string, selectField?: string[] }) {
    const { id, selectField } = data;
    try {
        const entry: T = await clientContentful.getEntry(id, {
            select: selectField ? selectField.join(",") : ""
        });
        return entry;
    }
    catch (error) {
        console.log(error);
    }
}