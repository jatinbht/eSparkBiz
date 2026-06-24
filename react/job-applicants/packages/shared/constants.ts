export const basicInfoFilterableColumns = [
    { key: 'city',                label: 'City',                type: 'distinct' },
    { key: 'state',               label: 'State',               type: 'distinct' },
    { key: 'designation',         label: 'Designation',         type: 'distinct' },
    { key: 'gender',              label: 'Gender',              type: 'enum', options: ['male', 'female', 'other'] },
    { key: 'relationship_status', label: 'Relationship Status', type: 'enum', options: ['single', 'committed'] },
    // { key: 'dob',                 label: 'Date of Birth',       type: 'daterange' },
] as const;
