
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#animate-nav');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    navigation.classList.toggle('open');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Course Information and Filtering Logic
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 3, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsDisplay = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        courseContainer.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

function filterSelection(subject) {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    
    if (subject === 'all') {
        document.querySelector('#filter-all').classList.add('active');
        displayCourses(courses);
    } else {
        document.querySelector(`#filter-${subject.toLowerCase()}`).classList.add('active');
        const filtered = courses.filter(course => course.subject === subject);
        displayCourses(filtered);
    }
}

document.querySelector('#filter-all').addEventListener('click', () => filterSelection('all'));
document.querySelector('#filter-cse').addEventListener('click', () => filterSelection('CSE'));
document.querySelector('#filter-wdd').addEventListener('click', () => filterSelection('WDD'));

displayCourses(courses);