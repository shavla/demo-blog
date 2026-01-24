import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/navbar/Logo";

const AboutPage = () => {
    return (
        <div>
            <div className="bg-navbar-secondary px-8 py-20 text-white">
                <div className="max-w-[40rem]">
                    <h1 className="text-5xl md:text-6xl">Everyone has a story to tell</h1>
                    <p className="text-xl mt-10 md:mt-14">Bot Or Not is a home for human stories and ideas. Here, anyone can share knowledge and wisdom with the world—without having to build a mailing list or a following first. The internet is noisy and chaotic; Bot Or Not is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right readers for whatever you have to say.</p>
                    <p className="text-3xl mt-8 "><span className="bg-white/20">Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.</span></p>
                    <p className="text-xl mt-8">We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.</p>
                    <p className="text-xl mt-8">Over 100 million people connect and share their wisdom on Bot Or Not every month. They’re software developers, amateur novelists, product designers, CEOs, and anyone burning with a story they need to get out into the world. They write about what they’re working on, what’s keeping them up at night, what they’ve lived through, and what they’ve learned that the rest of us might want to know too.</p>
                    <p className="text-xl mt-8">Instead of selling ads or selling your data, we’re supported by a growing community of over a million Bot Or Not members who believe in our mission. If you’re new here, start reading. Dive deeper into whatever matters to you. Find a post that helps you learn something new, or reconsider something familiar—and then <Link to={"/createBlog"} className="underline"> write your story</Link>.</p>
                </div>
            </div>
            <div className="flex flex-col">
                <Link to={"/"} className="bg-navbar-secondary text-white border-y-2 border-white flex justify-between items-center py-10 px-12 hover:text-navbar-secondary hover:bg-white duration-300">
                    <div className="text-4xl md:text-6xl">Start reading</div>
                    <ArrowRight size={"3rem"}></ArrowRight>
                </Link>
                <Link to={"/createBlog"} className="bg-navbar-secondary text-white flex border-b-2 justify-between items-center py-10 px-12 hover:text-navbar-secondary hover:bg-white duration-300 hover:border-black/10">
                    <div className="text-4xl md:text-6xl">Start writing</div>
                    <ArrowRight size={"3rem"}></ArrowRight>
                </Link>
            </div>
            <div className="footer p-4">
                <Logo size={30}></Logo>
            </div>
        </div>
    );
}

export default AboutPage;