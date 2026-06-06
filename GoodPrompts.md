# Good Prompts

> Some interesting prompts that can make life easy.
> Used with Claude code

## Session Log Prompt

> Tells Claude Code to create a Session Log .md file which continuously keeps track of the chat. Helps to restart a new conversation if the current context starts hallucinating

Before starting lets start documenting our discussions as we go. Create a new "FILE_NAME.md" file which can act as a continuously updating bullet-point style summary of our discussion in this chat context. Whenever I ask you a question and you give me an answer append a summarised version of my question and your response to this new file, while always ensuring that critical information is not omitted or mis-respresented. Please ensure that this document should not be overwritten from scratch everytime i ask you something, I would like to maintain a sort of session history using this document which I can refer to later. You can make minor changes to older content in this .md file as we keep disucssing, but understand that you have authorization to tweak things and not overwritiing the whole file.

## New Project Setup Prompt

> Sets up a new project sub-folder inside this workspace with the correct structure for Claude Code to work effectively across devices. Run this at the start of any new project discussion.

I want to start a new project called "PROJECT_NAME". Please set up the project structure for it inside this workspace:

1. Create a subfolder `PROJECT_NAME/` in the current working directory.
2. Inside it, create a `CLAUDE.md` file with the following sections filled in based on what I describe about the project:
   - **What this project is** — a 2-3 sentence summary of the goal and context
   - **Current status** — where we are right now (e.g., research, feasibility, active build, on hold)
   - **Key decisions made so far** — leave blank if none yet
   - **Active constraints** — deadlines, tech limitations, budget, team size, etc.
   - **Session log** — note that `PROJECT_NAME_Session_Log.md` in this folder is the running discussion history
3. Create a `PROJECT_NAME_Session_Log.md` file using the Session Log pattern — this will be our continuously-updated discussion record for this project.
4. If a root `CLAUDE.md` exists in the parent folder, add a one-line entry for this project under the directory map section.

Once done, confirm the structure and ask me to describe the project so you can fill in the `CLAUDE.md` properly.
