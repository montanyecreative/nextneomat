"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";

import Link from "next/link";

export default function BecomeADeveloper() {
	return (
		<main>
			<Navbar />
			<div className="page-banner-filler bg-black"></div>
			<div className="container sm:mx-auto md:mx-auto privacy-page bg-black text-white">
				<div className="grid grid-cols-1 pt-10 pb-20 mx-auto md:mx-20 justify-center">
					<h2 className="text-[34px] mb-2 text-white">Want to become a website developer?</h2>
					<p className="italic">
						<b>Published</b>: 08/29/2021 <b>Last updated</b>: 03/11/2023
					</p>
					<h3 className="font-bold mt-3 mb-2">Overview</h3>
					<p className="my-1">
						To become a website developer, you must understand the basic building blocks that make up a website and how they
						function. Skills you must learn include HTML5, CSS, and JavaScript. Responsive Design will make your website look
						good no matter the screen size and should always be a priority when you are developing any website or app. SASS is a
						coding language that makes CSS easier to use and more reusable which will save you time from the get go when
						developing websites and apps. Bootstrap and Material Design are two different design frameworks that include
						prebuilt HTML elements and designs for those elements so that you can write less code and get your web app up and
						running quicker.
					</p>
					<h3 className="font-bold mt-3 mb-2">Nice to haves are:</h3>
					<p className="my-1">
						<b>- The Agile Methodology</b>, which defines how you will be planning, designing, and developing websites in your
						daily career. It will also define how to communicate with teams that interface with websites and application
						projects.
					</p>
					<p className="my-1">
						<b>- Git &amp; Version Control</b> will help you organize code and avoid coding errors when working with more than
						one person on a project.
					</p>
					<p className="my-1">
						<b>- ReactJS, Angular, and VueJS</b> are JavaScript libraries and frameworks (in case of Angular) that are similar
						to SASS in that they include several pre-built JavaScript functionalities that make developing easier and quicker.
						These libraries are highly prized in recruiting for jobs.
					</p>
					<p className="my-1">
						<b>- NPM</b> is a package manager tool that is essential to installing several of the libraries and frameworks
						discussed above. It is often used in a CLI format that can be worked by entering different commands to achieve
						different results.
					</p>
					<h3 className="font-bold mt-3 mb-2">Skills to Learn:</h3>
					<p className="my-1">
						- HTML5{" "}
						<Link
							href="https://www.w3schools.com/html/html_intro.asp"
							target="_blank"
							rel="noopener"
							aria-label="Get started with HTML5"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- CSS3{" "}
						<Link
							href="https://www.w3schools.com/css/css_intro.asp"
							target="_blank"
							rel="noopener"
							aria-label="Get started with CSS3"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- SASS{" "}
						<Link
							href="https://sass-lang.com/guide"
							target="_blank"
							rel="noopener"
							aria-label="Get started with SASS"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Responsive Design{" "}
						<Link
							href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Responsive Design"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- JavaScript{" "}
						<Link
							href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash"
							target="_blank"
							rel="noopener"
							aria-label="Get started with JavaScript"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Bootstrap{" "}
						<Link
							href="https://getbootstrap.com/docs/5.0/getting-started/introduction/"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Bootstrap"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Material Design{" "}
						<Link
							href="https://material.io/design/introduction"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Material Design"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Agile Methodology{" "}
						<Link
							href="https://medium.com/shecancode/an-introduction-to-agile-software-development-914339dcec66"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Agile Methodology"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Git &amp; Version Control{" "}
						<Link
							href="https://www.atlassian.com/git/tutorials/what-is-version-control"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Git &amp; Version Control"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- ReactJS{" "}
						<Link
							href="https://reactjs.org/tutorial/tutorial.html"
							target="_blank"
							rel="noopener"
							aria-label="Get started with ReactJS"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- Angular{" "}
						<Link
							href="https://angular.io/guide/what-is-angular"
							target="_blank"
							rel="noopener"
							aria-label="Get started with Angular"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- VueJS{" "}
						<Link
							href="https://vuejs.org/v2/guide/"
							target="_blank"
							rel="noopener"
							aria-label="Get started with VueJS"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<p className="my-1">
						- NPM &amp; Node.JS{" "}
						<Link
							href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
							target="_blank"
							rel="noopener"
							aria-label="Get started with NPM &amp; Node.JS"
							className="underline"
						>
							Get Started
						</Link>
					</p>
					<h3 className="font-bold mt-3 mb-2">Books to Read:</h3>
					<p className="my-1">
						<Link
							href="https://www.amazon.com/Web-Design-HTML-JavaScript-jQuery/dp/1118907442/"
							target="_blank"
							rel="noopener"
							aria-label="Buy Web Design with HTML, CSS, JavaScript and jQuery Set by Jon Duckett"
							className="underline"
						>
							Web Design with HTML, CSS, JavaScript and jQuery Set by Jon Duckett
						</Link>
					</p>
					<p className="my-1">
						<Link
							href="https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary-dp-0135957052/dp/0135957052/"
							target="_blank"
							rel="noopener"
							aria-label="Buy The Pragmatic Programmer: Your Journey To Mastery by David Thomas and Andrew Hunt"
							className="underline"
						>
							The Pragmatic Programmer: Your Journey To Mastery by David Thomas and Andrew Hunt
						</Link>
					</p>
					<p className="my-1">
						<Link
							href="https://a.co/d/39oAFLO"
							target="_blank"
							rel="noopener"
							aria-label="Buy The Epic Guide to Agile: More Business Value on a Predictable Schedule with Scrum by Dave Todaro"
							className="underline"
						>
							The Epic Guide to Agile: More Business Value on a Predictable Schedule with Scrum by Dave Todaro - Updated
							03/11/2023
						</Link>
					</p>
					<h3 className="font-bold mt-3 mb-2">Bootcamps:</h3>
					<p className="my-1">
						<Link
							href="https://brainstation.io/course/online/remote-web-development-bootcamp"
							target="_blank"
							rel="noopener"
							aria-label="Take the Coding Bootcamp Online by Brainstation"
							className="underline"
						>
							Coding Bootcamp Online by Brainstation
						</Link>
					</p>
					<p className="my-1">
						<Link
							href="https://www.thinkful.com/bootcamp/web-development/#introduction"
							target="_blank"
							rel="noopener"
							aria-label="Take the Software Engineering Bootcamp by Thinkful"
							className="underline"
						>
							Software Engineering Bootcamp by Thinkful
						</Link>
					</p>
					<h3 className="font-bold mt-3 mb-2">Courses:</h3>
					<p className="my-1">
						<Link
							href="https://javascript30.com/"
							target="_blank"
							rel="noopener"
							aria-label="Take the JavaScript30 (free) course"
							className="underline"
						>
							JavaScript30 (free)
						</Link>
					</p>
					<p className="my-1">
						<Link
							href="https://www.udemy.com/course/the-complete-javascript-course/"
							target="_blank"
							rel="noopener"
							aria-label="Take The Complete JavaScript Course 2021 by udemy"
							className="underline"
						>
							The Complete JavaScript Course 2021 by udemy
						</Link>
					</p>
					<p className="my-1">Next Steps:</p>
					<p className="my-1">
						The next step of your journey to becoming a website developer is to learn about APIs and how to consume them to show
						data in your application.
					</p>
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
