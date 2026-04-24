const loadApplicants = async () => {
    const response = await fetch('api/applicants'); //TODO: add leading /
    if (!response.ok) {
        const text = await response.text();
        throw new Response(`Error! Response: ${text}`, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
        });
    }
    return response.json();
};

export { loadApplicants };
