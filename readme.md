# Continuo
Musician practice journal app

Live Link: *Coming soon (I took it down to save some money)*

## Technology Stack

### Front End
* React (Vite) / Asp.Net MVC
* TailwindCSS

### Back End
* Asp.Net Web API
* Entity Framework Core
* 1-minute-expiry JWT access tokens with 6-month-expiry refresh tokens on the DB.

### CI/CD and Deployment
* AWS Elastic Beanstalk
* AWS RDS (MySQL Instance)

### Planning
* Figma
* MySQL workbench (ERD Design/Visualization)

## Minimum Viable Product
- [x] Login and registration
- [x] Authorization views through JWT and Refresh Token
- [ ] Dynamic Calendar View
- [ ] Quickstart practice session (free-form with no sub-tasks).
- [ ] Planned practice session (many-to-many association with sub-tasks).
- [x] User instrument creation with icon/color selection
- [ ] Robust selection of icons.
- [ ] Metronome for use during practice.
- [ ] Tuning drones for intonation and tuning.
- [ ] User able to record audio during session. Saved to S3 and served back through CloudFront.
- [ ] Practice Session state is cached on DB and can be accessed/continued from any device.
- [x] CI/CD Through AWS Elastic Beanstalk
- [ ] Instructors can be given access to review student practice sessions and audio if desired.

<img src='./GithubImg/login.png' height='350'> <img src='./GithubImg/register.png' height='350'>
<img src='./GithubImg/dashboard.png' height='350'><br>
<img src='./GithubImg/calendar.png' height='250'>