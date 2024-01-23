React Media Carousel

A media carousel that supports video, photo & audio combination, a title, and story.  Keyboard left, right, arrows and spacebar for pause/playback.  Auto slide show when video and audio playback completes.  CSS animation for transitions.

Currently this depends on React 18 and up and Material UI 5.15.

Usage Example:

    import useMediaCarousel from "react-media-carousel";

    const data = [
      {
        story: "My Story",
        title: "Today I went swimming",
        src: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        mediaType: "photo",
        audioSrc:"https://d9olupt5igjta.cloudfront.net/samples/sample_files/171110/2fae439df204976114e6126cca1b7545dbfa9467/mp3/_impact_water.mp3?1670416639",
      }
    ];

    const [mediaCarousel, openMediaCarousel] = useMediaCarousel({slides: data});

    return (
        <div>
        <div onClick={() => {
            openMediaCarousel();
        }}>Click Here</div>
        {mediaCarousel}
        </div>
    )

Props

    slides: array of objects (each object is a Slide defined below)
    theme: string ("dark" or "light")
    slideShow: boolean (true will automatically move to next slide in 5000 ms.)
    slideDuration: number (override the default 5000 ms with your own slide duration.)
    showNextButton: boolean (true will show a Next Button below the story.)
    nextButton: object (This is a way to override the next button.  Create a div of 45px to your own style.  No need to implement on click for next slide.  Just style the button.)
    nextButtonText: string (This is a way to override the text of the Next button.  Maybe for a translation.)
    swipeThreshold: number (override the default 50 px threshold for sliding to the next or previous slide.)
    fontSize: number (override the story font size of 16.)
    fontWeight: string (override the css font weight of the story.)
    fontFamily: string (override the css font family of the story.)
    opacity: number (override the default css opacity for the Backdrop. Range [0 to 1])
    desktopSlideWidth: number (override the default width of a desktop slide.)
    desktopSlideHeight: number (override the default height of a desktop slide.)
    title: object (React object to add a title to the carousel just above the main slide.)


Slide fields

    story: string,
    title: string,
    src: string (url of the photo or video),
    mediaType: string ("photo" or "video"),
    audioSrc: string (url of the audio for the slide.  Optional)

Supported story special characters

    \n : Will generate a new line with <br/>,
    &bull; : Will generate a bullet point with &bull; injected into the DOM. 

# Debugging

If you are running Node.js v17 or later, you may encounter some sort of “ERROR in index.js from Terser Error: error:0308010C:digital envelope routines::unsupported” when running “npm run build”. This error is often seen in Node.js v17 and later because they switched to OpenSSL 3, which enforces stricter security policies. Here are a couple of workarounds:

1. **Downgrading to Node.js v16 or Earlier**
   - Downgrading can resolve this issue because these versions use OpenSSL 1.1.1, which does not have the same restrictions.
   - **Steps:**
     - Uninstall your current Node.js.
     - Install Node.js v16.x from [Node.js Downloads](https://nodejs.org/en/download/).
     - After installation, verify the version using `node -v`.
     - Run `npm install` and `npm run build` in your project directory.

2. **Setup an Environment Variable to Allow the Use of Legacy OpenSSL APIs**
   - **For macOS or Linux:**
     - Open terminal and run:
       1. `export NODE_OPTIONS=--openssl-legacy-provider`
   - **For Windows:**
     - Open command prompt and run:
       1. `set NODE_OPTIONS=--openssl-legacy-provider`
       2. Or in PowerShell run:
           - `$env:NODE_OPTIONS="--openssl-legacy-provider"`
