import { ApiProjectsPageProjectsPage, SharedProject } from "./schemas";
import { fetchStrapiAPI } from "../lib/strapiApi";
import * as Separator from "@radix-ui/react-separator";
import { StrapiImage } from "../components/StrapiImage";
import { getStrapiMedia } from "../lib/strapiMedia";
import Seo from "../components/seo";

export default function projects({ projects }: { projects: ApiProjectsPageProjectsPage }) {
  console.log(projects.attributes.Projects[0].DoiImage.data.attributes.url);
  return (
    <>
      <Seo seo={projects.attributes.seo} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <h1 className="my-5 text-center text-5xl text-white">Projects</h1>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <div className="mb-4 whitespace-pre-wrap text-lg text-white">
          <p>{projects.attributes.Description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.attributes.Projects.map((project: SharedProject["attributes"]) => {
            return (
              <div key={project.Title} className="mx-4 rounded-xl bg-neutral-700 p-2 shadow hover:shadow-xl">
                <a href={project.LinkToProject} target="_blank" rel="noreferrer">
                  <StrapiImage
                    cls="h-auto w-full sm:h-auto lg:w-4/5 object-cover object-center mx-auto"
                    image={project.Logo}
                  />
                  <p className="text-center text-xl text-white">{project.Title}</p>
                </a>
                <a href={project.DoiLink} target="_blank" rel="noreferrer">
                  {project.DoiLink && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="max-w-1/2 mx-auto my-2 h-auto object-cover object-center sm:h-auto"
                      src={getStrapiMedia(project.DoiImage)}
                      alt="Doi"
                    />
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [projectsRes] = await Promise.all([
    fetchStrapiAPI("/projects-page", {
      populate: {
        Projects: {
          populate: ["Logo", "DoiImage"],
        },
      },
    }),
  ]);
  return {
    props: {
      projects: projectsRes.data,
    },
  };
}
