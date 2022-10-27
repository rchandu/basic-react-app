# Problem

A simple React application that lists our public GitHub repositories, where clicking one of the repositories in the list takes the user to a page containing additional details about that particular repository.

# Setup

1. Clone the repository
2. Install dependencies `npm run install`

That's it.

# Running for dev

Run `npm run dev` and navigate to http://localhost:5173/

# Libraries used

1. **Vite:** Like for it being an independent build tool without full-fledged complexity that comes along with a more powerful framework like nextjs, gatsby etc.
2. **react-router-dom:** Just for ease of use w.r.t implementing routing along with outlet & parent templating at higher level.
3. **Regular CSS instead of styled components**: Since confining to very few pages, didn't want to add additional runtime complexity of styled components.
