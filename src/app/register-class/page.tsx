import Link from "next/link";
import { classes } from "@/data/classes";
import { ClassGrid } from "@/components/classes/ClassCard";
export const metadata = {title:"Register for a Class | Sandalu Weerasekara",description:"Explore classes and enquire about registration."};
export default function RegisterClassPage(){return <main className="container section"><header className="header sw-page-header"><span className="eyebrow">START LEARNING</span><h1>Register for a class</h1><p>Choose a class below to view its details and available enquiry options. Registration is not confirmed until the class organizer responds.</p></header><ClassGrid items={classes.slice(0,9)}/><p className="sw-centered">Need help? <Link href="/#contact">Contact us</Link>.</p></main>}
