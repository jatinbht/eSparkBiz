export const basicInfoFilterableColumns = [
    { key: 'city',                label: 'City',                type: 'distinct',   paramKeys: ['city'] },
    { key: 'state',               label: 'State',               type: 'distinct',   paramKeys: ['state'] },
    { key: 'designation',         label: 'Designation',         type: 'distinct',   paramKeys: ['designation'] },
    { key: 'gender',              label: 'Gender',              type: 'enum',       paramKeys: ['gender'],                  options: ['male', 'female', 'other'] },
    { key: 'relationship_status', label: 'Relationship Status', type: 'enum',       paramKeys: ['relationship_status'],     options: ['single', 'committed'] },
    { key: 'dob',                 label: 'Date of Birth',       type: 'daterange',  paramKeys: ['dob_from', 'dob_to'] },
] as const;
