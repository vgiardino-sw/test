export type ResourceCost = {
    resource: {
      SubscriptionId: string;
      ResourceGroup: string;
      Provider: string;
      ResourceType: string;
      ResourceName: string;
    };
    Currency: string;
    Cost: number;
    Tags: {
      [key: string]: string;
    };
  };

export type SortOrder = 'Asc' | 'Desc';

export type SortField = 'Cost' | 'ResourceName' | 'ResourceType' | 'ResourceGroup';