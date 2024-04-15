export type Space = {
    name: string,
    multiple_assignees: boolean,
    features: Features
}

export type Features = {
    due_dates: DueDates,
    time_tracking: FeaturesProperty,
    tags: FeaturesProperty,
    time_estimates: FeaturesProperty,
    checklists: FeaturesProperty,
    custom_fields: FeaturesProperty,
    remap_dependencies: FeaturesProperty,
    dependency_warning: FeaturesProperty,
    portfolios: FeaturesProperty
}

export type DueDates = FeaturesProperty & {
    start_date: boolean,
    remap_due_dates: boolean,
    remap_closed_due_date: boolean
}

export type FeaturesProperty = {
    enabled: boolean
}