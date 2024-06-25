export interface Sys {
    id: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
    space?: object;
}

export interface Metadata {
    tags: any[];
}

// Define the base interface for a Contentful asset
interface ContentfulAssetFields {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  }
  
  // Define the main Contentful asset interface
  export interface ContentfulAsset {
    sys: Sys;
    fields: ContentfulAssetFields;
  }