document.addEventListener('DOMContentLoaded', () => {
  const showCourseButton = document.getElementById('show-course-details');
  const courseDetails = document.getElementById('course-details');

  function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <button id="closeModal" type="button">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
      courseDetails.close();
    });
  }

  showCourseButton?.addEventListener('click', () => {
    displayCourseDetails({
      subject: 'WDD',
      number: 231,
      title: 'Web Frontend Development',
      credits: 3,
      certificate: 'Yes',
      description: 'Build interactive web experiences with modern front-end technologies.',
      technology: ['HTML', 'CSS', 'JavaScript']
    });
  });
});