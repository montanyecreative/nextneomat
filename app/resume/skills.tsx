import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// icons
const htmlImage = "/resume/skills/html5.svg";
const adobeIllustratorImage = "/resume/skills/adobeillustrator.svg";
const adobePhotoshopImage = "/resume/skills/adobephotoshop.svg";
const atlassianImage = "/resume/skills/atlassian.svg";
const jiraImage = "/resume/skills/jira.svg";
const angularImage = "/resume/skills/angular.svg";
const bootstrapImage = "/resume/skills/bootstrap.svg";
const csharpImage = "/resume/skills/csharp.svg";
const css3Image = "/resume/skills/css3.svg";
const dotnetImage = "/resume/skills/dot-net.svg";
const gitImage = "/resume/skills/git.svg";
const githubImage = "/resume/skills/github-white.svg";
const googleanalyticsImage = "/resume/skills/googleanalytics.svg";
const gulpImage = "/resume/skills/gulp.svg";
const herokuImage = "/resume/skills/heroku.svg";
const invisionImage = "/resume/skills/invision.svg";
const javascriptImage = "/resume/skills/javascript.svg";
const jqueryImage = "/resume/skills/jquery.svg";
const jsonImage = "/resume/skills/json.svg";
const mailchimpImage = "/resume/skills/mailchimp.svg";
const materialdesignImage = "/resume/skills/materialdesign.svg";
const mysqlImage = "/resume/skills/mysql.svg";
const nodejsImage = "/resume/skills/nodejs.svg";
const npmImage = "/resume/skills/npm.svg";
const phpImage = "/resume/skills/php.svg";
const postgresqlImage = "/resume/skills/postgresql.svg";
const reactImage = "/resume/skills/react.svg";
const responsiveImage = "/resume/skills/responsive.svg";
const salesforceImage = "/resume/skills/salesforce.svg";
const sassImage = "/resume/skills/sass.svg";
const sketchImage = "/resume/skills/sketch.svg";
const slackImage = "/resume/skills/slack.svg";
const typescriptImage = "/resume/skills/typescript.svg";
const uxuiImage = "/resume/skills/ux-ui.svg";
const wordpressImage = "/resume/skills/wordpress.svg";
const shopifyImage = "/resume/skills/shopify.svg";
const nextdotjsImage = "/resume/skills/nextdotjs.svg";
const vercelImage = "/resume/skills/vercel.svg";
const tailwindcssImage = "/resume/skills/tailwindcss.svg";
const shadcnuiImage = "/resume/skills/shadcnui.svg";
const bitbucketImage = "/resume/skills/bitbucket.svg";
const microsoftteamsImage = "/resume/skills/microsoftteams.svg";

export default function SkillsSection() {
	return (
		<div className="avatar-shadow my-10" id="skills">
			<Card className="border-0">
				<CardHeader>
					<CardTitle className="card-title text-[32px]">Skills</CardTitle>
				</CardHeader>
				<CardContent className="card-content">
					<div className="grid grid-cols-2 md:grid-cols-6 gap-1">
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={adobeIllustratorImage} alt="Adobe Illustrator Icon" />
								<AvatarFallback>Adobe Illustrator</AvatarFallback>
							</Avatar>
							<p>
								Adobe <br /> Illustrator
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={adobePhotoshopImage} alt="Adobe Photoshop Icon" />
								<AvatarFallback>Adobe Photoshop</AvatarFallback>
							</Avatar>
							<p>
								Adobe <br /> Photoshop
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={angularImage} alt="Angular Icon" />
								<AvatarFallback>Angular</AvatarFallback>
							</Avatar>
							<p>Angular</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={atlassianImage} alt="Atlassian Icon" />
								<AvatarFallback>Atlassian</AvatarFallback>
							</Avatar>
							<p>Atlassian</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={bitbucketImage} alt="BitBucket Icon" />
								<AvatarFallback>BitBucket</AvatarFallback>
							</Avatar>
							<p>BitBucket</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={bootstrapImage} alt="Bootstrap Icon" />
								<AvatarFallback>Bootstrap</AvatarFallback>
							</Avatar>
							<p>Bootstrap</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={csharpImage} alt="C# Icon" />
								<AvatarFallback>C#</AvatarFallback>
							</Avatar>
							<p>C#</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={css3Image} alt="CSS3 Icon" />
								<AvatarFallback>CSS3</AvatarFallback>
							</Avatar>
							<p>CSS3</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={gitImage} alt="Git Icon" />
								<AvatarFallback>Git</AvatarFallback>
							</Avatar>
							<p>Git</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={githubImage} alt="GitHub Icon" />
								<AvatarFallback>GitHub</AvatarFallback>
							</Avatar>
							<p>GitHub</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={googleanalyticsImage} alt="Google Analytics Icon" />
								<AvatarFallback>Google Analytics</AvatarFallback>
							</Avatar>
							<p>
								Google <br /> Analytics
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={gulpImage} alt="Gulp Icon" />
								<AvatarFallback>Gulp</AvatarFallback>
							</Avatar>
							<p>Gulp</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={herokuImage} alt="Heroku Icon" />
								<AvatarFallback>Heroku</AvatarFallback>
							</Avatar>
							<p>Heroku</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={htmlImage} alt="HTML5 Icon" />
								<AvatarFallback>HTML5</AvatarFallback>
							</Avatar>
							<p>HTML5</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={invisionImage} alt="inVision Icon" />
								<AvatarFallback>inVision</AvatarFallback>
							</Avatar>
							<p>inVision</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={javascriptImage} alt="JavaScript Icon" />
								<AvatarFallback>JavaScript</AvatarFallback>
							</Avatar>
							<p>JavaScript</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={jiraImage} alt="Jira Icon" />
								<AvatarFallback>Jira</AvatarFallback>
							</Avatar>
							<p>Jira</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={jqueryImage} alt="jQuery Icon" />
								<AvatarFallback>jQuery</AvatarFallback>
							</Avatar>
							<p>jQuery</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={jsonImage} alt="JSON Icon" />
								<AvatarFallback>JSON</AvatarFallback>
							</Avatar>
							<p>JSON</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={mailchimpImage} alt="Mailchimp Icon" />
								<AvatarFallback>Mailchimp</AvatarFallback>
							</Avatar>
							<p>Mailchimp</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={materialdesignImage} alt="Material Design Icon" />
								<AvatarFallback>Material Design</AvatarFallback>
							</Avatar>
							<p>
								Material <br /> Design
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={microsoftteamsImage} alt="Microsoft Teams Icon" />
								<AvatarFallback>Microsoft Teams</AvatarFallback>
							</Avatar>
							<p>
								Microsoft <br /> Teams
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={mysqlImage} alt="MySQL Icon" />
								<AvatarFallback>MySQL</AvatarFallback>
							</Avatar>
							<p>MySQL</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={dotnetImage} alt=".NET Icon" />
								<AvatarFallback>.NET</AvatarFallback>
							</Avatar>
							<p>.NET</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={nextdotjsImage} alt="NextJS Icon" />
								<AvatarFallback>NextJS</AvatarFallback>
							</Avatar>
							<p>NextJS</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={nodejsImage} alt="Node JS Icon" />
								<AvatarFallback>Node JS</AvatarFallback>
							</Avatar>
							<p>Node JS</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={npmImage} alt="npm Icon" />
								<AvatarFallback>npm</AvatarFallback>
							</Avatar>
							<p>npm</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={phpImage} alt="PHP Icon" />
								<AvatarFallback>PHP</AvatarFallback>
							</Avatar>
							<p>PHP</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={postgresqlImage} alt="PostGRESQL Icon" />
								<AvatarFallback>PostGRESQL</AvatarFallback>
							</Avatar>
							<p>PostGRESQL</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={reactImage} alt="ReactJS Icon" />
								<AvatarFallback>ReactJS</AvatarFallback>
							</Avatar>
							<p>ReactJS</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={responsiveImage} alt="Responsive Design Icon" />
								<AvatarFallback>Responsive Design</AvatarFallback>
							</Avatar>
							<p>
								Responsive <br /> Design
							</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={salesforceImage} alt="Salesforce Icon" />
								<AvatarFallback>Salesforce</AvatarFallback>
							</Avatar>
							<p>Salesforce</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={sassImage} alt="SASS Icon" />
								<AvatarFallback>SASS</AvatarFallback>
							</Avatar>
							<p>SASS</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={shadcnuiImage} alt="ShadCN UI Icon" />
								<AvatarFallback>ShadCN UI</AvatarFallback>
							</Avatar>
							<p>ShadCN UI</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={shopifyImage} alt="Shopify Icon" />
								<AvatarFallback>Shopify</AvatarFallback>
							</Avatar>
							<p>Shopify</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={sketchImage} alt="Sketch Icon" />
								<AvatarFallback>Sketch</AvatarFallback>
							</Avatar>
							<p>Sketch</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={slackImage} alt="Slack Icon" />
								<AvatarFallback>Slack</AvatarFallback>
							</Avatar>
							<p>Slack</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={tailwindcssImage} alt="TailwindCSS Icon" />
								<AvatarFallback>TailwindCSS</AvatarFallback>
							</Avatar>
							<p>TailwindCSS</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={typescriptImage} alt="TypeScript Icon" />
								<AvatarFallback>TypeScript</AvatarFallback>
							</Avatar>
							<p>TypeScript</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={uxuiImage} alt="UX UI Icon" />
								<AvatarFallback>UX UI</AvatarFallback>
							</Avatar>
							<p>UX UI</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={vercelImage} alt="Vercel Icon" />
								<AvatarFallback>Vercel</AvatarFallback>
							</Avatar>
							<p>Vercel</p>
						</div>
						<div className="skill-container my-5">
							<Avatar className="skill avatar-shadow mx-auto mb-3">
								<AvatarImage src={wordpressImage} alt="WordPress Icon" />
								<AvatarFallback>WordPress</AvatarFallback>
							</Avatar>
							<p>WordPress</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
