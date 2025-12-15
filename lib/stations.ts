export const stations = [
    { code: "NDLS", name: "New Delhi", city: "Delhi" },
    { code: "CSMT", name: "Mumbai CSMT", city: "Mumbai" },
    { code: "HWH", name: "Howrah Junction", city: "Kolkata" },
    { code: "MAS", name: "MGR Chennai Central", city: "Chennai" },
    { code: "SBC", name: "KSR Bengaluru", city: "Bengaluru" },
    { code: "ADI", name: "Ahmedabad Junction", city: "Ahmedabad" },
    { code: "PUNE", name: "Pune Junction", city: "Pune" },
    { code: "JP", name: "Jaipur Junction", city: "Jaipur" },
    { code: "LKO", name: "Lucknow Charbagh NR", city: "Lucknow" },
    { code: "CNB", name: "Kanpur Central", city: "Kanpur" },
    { code: "PAT", name: "Patna Junction", city: "Patna" },
    { code: "SC", name: "Secunderabad Junction", city: "Hyderabad" },
    { code: "TVC", name: "Thiruvananthapuram Central", city: "Thiruvananthapuram" },
    { code: "BBS", name: "Bhubaneswar", city: "Bhubaneswar" },
    { code: "GHY", name: "Guwahati", city: "Guwahati" }
];

export const getStationName = (code: string) => stations.find(s => s.code === code)?.name || code;
