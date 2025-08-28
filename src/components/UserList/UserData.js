// Validation functions
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isValidName = (name) => {
    return name.trim().length >= 2 && name.trim().length <= 50;
};
// Generate realistic user data
const generateUsers = (count) => {
    // Real-looking names for better demo
    const firstNames = [
        'Alex', 'Maria', 'James', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa',
        'Robert', 'Jennifer', 'William', 'Elizabeth', 'Richard', 'Patricia',
        'Charles', 'Linda', 'Christopher', 'Barbara', 'Daniel', 'Susan',
        'Matthew', 'Jessica', 'Anthony', 'Karen', 'Mark', 'Nancy', 'Donald',
        'Betty', 'Steven', 'Helen', 'Paul', 'Sandra', 'Andrew', 'Donna'
    ];
    const lastNames = [
        'Johnson', 'Garcia', 'Smith', 'Brown', 'Davis', 'Wilson', 'Miller',
        'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
        'Thompson', 'Robinson', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall',
        'Allen', 'Young', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green'
    ];
    const roles = [
        'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
        'UI/UX Designer', 'Product Manager', 'Data Analyst', 'DevOps Engineer',
        'QA Engineer', 'Software Architect', 'Business Analyst', 'Intern',
        'Senior Developer', 'Team Lead', 'Scrum Master', 'Technical Writer'
    ];
    const statuses = ['active', 'inactive', 'pending'];
    const companies = ['example.com', 'company.org', 'business.net', 'startup.io', 'tech.co'];
    return Array.from({ length: count }, (_, i) => {
        const id = i + 1;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;
        const company = companies[Math.floor(Math.random() * companies.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.random() > 0.5 ? id : ''}@${company}`;
        // Create realistic dates
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 365)); // Up to 1 year ago
        const lastLogin = Math.random() > 0.2 ? new Date() : undefined; // 80% chance of having logged in
        if (lastLogin) {
            lastLogin.setDate(lastLogin.getDate() - Math.floor(Math.random() * 30)); // Up to 30 days ago
        }
        const user = {
            id,
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
            role: roles[Math.floor(Math.random() * roles.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt,
            lastLogin
        };
        // Validate the generated data
        if (!isValidName(user.name) || !isValidEmail(user.email)) {
            console.warn(`Invalid user data generated for ID ${id}`);
        }
        return user;
    });
};
// Search utility function
const searchUsers = (users, searchTerm) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
        return users;
    }
    const term = searchTerm.toLowerCase().trim();
    return users.filter(user => {
        // Search in multiple fields
        const searchFields = [
            user.name,
            user.email,
            user.role,
            user.status,
            user.id.toString()
        ];
        return searchFields.some(field => field.toLowerCase().includes(term));
    });
};
export { generateUsers, searchUsers, isValidEmail, isValidName };
