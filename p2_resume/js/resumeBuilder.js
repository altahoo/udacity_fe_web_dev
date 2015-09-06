/*
This is empty on purpose! Your code to build the resume will go here.
 */


var bio = {
	"name": "Ting Li",
 	"role": "Software Engineer",
 	"welcomeMessage": "Never never give up!",
 	"contacts": {
 		"mobile": "786-369-6666",
 		"email": "tli@amplify.com",
 		"github": "altahoo",
 		"location": "Fresh Meadows, NY"
 	},
 	"skills": [
 		"software design", 
 		"Unix/Linux", 
 		"troubleshooting and debugging skills", 
 		"proficient in: C++, Java, Python",
 		"fast-learner",
 		"strong achiever"
 	],
 	"bioPic": "https://media.licdn.com/media/p/6/000/1f6/250/29709ff.jpg"
 };


var work = {
 	"jobs": [
 		{
 			"employer": "Amplify Education",
 			"title": "Software Engineer",
 			"location": "Brooklyn, NY",
 			"dates": "Nov 2014 - Current",
 			"description": "Worked in platform team to support various teams in company"
 		},
 		{
 			"employer": "Arden Companies",
 			"title": "Software Automation Engineer",
 			"location": "Bingham Farms, MI",
 			"dates": "June 2014 - Nov 2014",
 			"description": "Automated the enterprise scheduling platform and workflow"
 		},
 		{
 			"employer": "Los Alamos National Laboratory",
 			"title": "Research Assistant",
 			"location": "Los Alamos, NM",
 			"dates": "June 2011 - Aug 2011",
 			"description": "Worked in Information Sciences Group, improved FileSim by adding the network module"

 		}
 	]
 };

var education = {
 	"schools": [
 		{
 			"name": "Florida International University",
 			"location": "Miami, FL",
 			"degree": "Ph.D",
 			"majors": ["Computer Science"],
 			"dates": "2008 - 2014",
 			"url": "http://cs.fiu.edu/"
 		},
 		{
 			"name": "Nankai University",
 			"location": "Tianjin, China",
 			"degree": "M.S",
 			"majors": ["Communication and Information Systems"],
 			"dates": "2004 - 2007",
 			"url": "http://english.nankai.edu.cn/"
 		},
 		{
 			"name": "Nankai University",
 			"location": "Tianjin, China",
 			"degree": "B.E",
 			"majors": ["Communication Engineering"],
 			"dates": "2000 - 2004",
 			"url": "http://english.nankai.edu.cn/"
 		}
 	],
 	"onlineCourses": [
	 	{
	 	"title": "MongoDB for Developers",
	 	"school": "MongoDB University",
	 	"dates": "June 2015 - July 2015",
	 	"url": "http://university.mongodb.com/course_completion/e7c0117553964a20a58b1454ce6e069d"
	 	}
 	]
 }

var projects = {
 	"projects": [
 		{
 			"title": "Parallel Real-time Immersive network Modeling Environment (PRIME)",
 			"dates": "2008 - 2010",
 			"description": "Investigated fundamental technologies that enable real-time large-scale network simulations and developed a real-time immersive network simulation environment.",
 			"images": [
 				"images/prime.png", 
 				"images/fry.jpg"
 			]
 		}
 	]
 }

bio.display = function() {
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	$("#header").prepend(formattedRole);

	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	$("#header").prepend(formattedName);

	// Bio pic and skills
	var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
	$("#header").append(formattedBioPic);

	var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").append(formattedWelcomeMsg);

	if (bio.skills.length > 0) {
	 	$("#header").append(HTMLskillsStart);

	 	for (i in bio.skills) {
			var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
	 		$("#skills").append(formattedSkill);
	 	}
	}

	//Contacts
	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	$("#topContacts").append(formattedMobile);
	$("#footerContacts").append(formattedMobile);

	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	$("#topContacts").append(formattedEmail);
	$("#footerContacts").append(formattedEmail);

	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	$("#topContacts").append(formattedGithub);
	$("#footerContacts").append(formattedGithub);

	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	$("#topContacts").append(formattedLocation);
	$("#footerContacts").append(formattedLocation);
}


work.display = function() {
 	for (job in work.jobs) {
	 	$("#workExperience").append(HTMLworkStart);

	 	var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
	 	var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
	 	var formattedEmployerTitle = formattedEmployer + formattedTitle;
	 	$(".work-entry:last").append(formattedEmployerTitle);

	 	var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
	 	$(".work-entry:last").append(formattedDates);

		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
	 	$(".work-entry:last").append(formattedLocation);

	 	var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
	 	$(".work-entry:last").append(formattedDescription);
 	}
}

projects.display = function() {
	for (project in projects.projects) {
	 	$("#projects").append(HTMLprojectStart);

	 	var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
	 	$(".project-entry:last").append(formattedProjectTitle);

	 	var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
	 	$(".project-entry:last").append(formattedProjectDates);

	 	var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
	 	$(".project-entry:last").append(formattedProjectDescription);

	 	if (projects.projects[project].images.length > 0) {
	 		for (image in projects.projects[project].images) {
		 		var formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
		 		$(".project-entry:last").append(formattedProjectImage);
	 		}	
	 	} 	
 	}
}

education.display = function() {
 	for (school in education.schools) {
	 	$("#education").append(HTMLschoolStart);

	 	var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name).replace("#", education.schools[school].url);
	 	$(".education-entry:last").append(formattedSchoolName);

	 	var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
	 	$(".education-entry:last").append(formattedSchoolDegree);

	 	var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
	 	$(".education-entry:last").append(formattedSchoolDates);

	 	var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
	 	$(".education-entry:last").append(formattedSchoolLocation);

	 	if (education.schools[school].majors.length > 0) {
	 		for (major in education.schools[school].majors) {
		 		var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]);
		 		$(".education-entry:last").append(formattedSchoolMajor);
	 		}	
	 	} 	
 	}

 	$(".education-entry:last").append("<br>");
 	$(".education-entry:last").append(HTMLonlineClasses);
 	
 	for (course in education.onlineCourses) {
 		
 		var formattedTile = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
 		//$(".education-entry:last").append(formattedTile);

 		var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
 		$(".education-entry:last").append(formattedTile + formattedSchool);

 		var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
 		$(".education-entry:last").append(formattedDates);

 		var formattedUrl = HTMLonlineURL.replace("#", education.onlineCourses[course].url).replace("%data%", education.onlineCourses[course].url);
 		$(".education-entry:last").append(formattedUrl);
 	}

 	$(".education-entry:last").append("<hr>");
}

bio.display();
work.display();
projects.display();
education.display();

$("#map-div").append(googleMap);

$(document).click(function(loc) {
  // your code goes here!
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x, y);
});





 



