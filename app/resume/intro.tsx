import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";

const johnImage = "/john.jpg";

export default function IntroSection() {
    var beganStartMonth = 1;
    var beganStartYear = 2018;

    var beganStartYears = yearDiff(
        new Date(beganStartYear, beganStartMonth),
        new Date()
    );

    function yearDiff(dateFrom: Date, dateTo: Date) {
        return dateTo.getFullYear() - dateFrom.getFullYear();
    }

    return (
        <div className="resume-intro" id="highlights">
            <h1 className="text-[32px] font-bold mt-5">Resume</h1>
            <p className="my-2 mx-auto sm:mx-5 md:mx-unset italic">
                Currently only looking for small freelance projects
                outside of 8am-6pm schedule.
            </p>
            <div className="page-links-container">
                <Link href="/resume#highlights" className="mx-1 underline">Highlights</Link>
                <Link href="/resume#experience" className="mx-1 underline">Experience</Link>
                <Link href="/resume#education" className="mx-1 underline">Education</Link>
                <Link href="/resume#skills" className="mx-1 underline">Skills</Link>
            </div>
            <p className="my-5 mx-auto sm:mx-5 md:mx-unset">
                Ambitious Salesforce B2C Commerce Cloud Developer with{" "}
                {beganStartYears ? beganStartYears + "+" : ""} years of
                hands-on industry experience, including experience with
                Salesforce Commerce Cloud, SFRA, Page Designer,
                JavaScript, ISML/SASS, Bootstrap, React, Nodejs, and a
                variety of other web platforms. Passionate about
                learning new technologies with an eagerness to go above
                and beyond both individually and with a team to get the
                job done. Seeking new challenges and growth
                opportunities within a growing organization.
            </p>
            <Avatar className="avatar mx-auto">
                <AvatarImage src={johnImage} />
                <AvatarFallback>John Montanye</AvatarFallback>
            </Avatar>
            <h5 className="my-5 text-[24px]">John Montanye</h5>
            <p className="italic mb-5 text-[16px]">Leans front-end</p>
            <div className="flex justify-center">
                <p className="text-[14px]">Front-end</p>
                <Slider defaultValue={[40]} max={100} step={10} disabled={true} aria-label="Skill comfort slider" className="mx-10" />
                <p className="text-[14px]">Back-end</p>
            </div>
        </div>
    );
}
