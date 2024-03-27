use leptos::*;

// Define a struct for social media data
struct SocialMedia {
    media: String,
    link: String,
    icon: String,
}

// Reusable avatar component
#[component]
fn Avatar() -> impl IntoView {
    view! {
        <img
            class:profile-pic=true
            src="https://avatars.githubusercontent.com/u/52826253?v=4"
            alt="Profile Picture"
        />
    }
}

// Reusable header component
#[component]
fn Header() -> impl IntoView {
    view! {
        <div>
            <h1>"Aniket Ambore"</h1>
            <p class:username=true>"@anipy1"</p>
            <p class:bio=true>
                "Bitcoin and Notes and Other Stuff Over Relays and Flutter and Rust 🦀⚡"
            </p>
        </div>
    }
}

// Reusable social link component
#[component]
fn SocialLink(media: String, link: String, icon: String) -> impl IntoView {
    view! {
        <a class:social-link=true rel="noopener" target="_blank" href=link>
            <img src=icon/>
            {media}
        </a>
    }
}

// Reusable component for social links view
#[component]
fn SocialLinksView() -> impl IntoView {
    // Define social media data
    let socials = vec![
        SocialMedia {
            media: "LinkedIn".to_string(),
            link: "https://www.linkedin.com/in/aniketambore/".to_string(),
            icon: "https://raw.githubusercontent.com/aniketambore/personal-bitcoin-tip-card/main/assets/linkedin.svg".to_string(),
        },
        SocialMedia {
            media: "Github".to_string(),
            link: "https://github.com/aniketambore/".to_string(),
            icon: "https://raw.githubusercontent.com/aniketambore/personal-bitcoin-tip-card/main/assets/github.svg".to_string(),
        },
        SocialMedia {
            media: "Twitter".to_string(),
            link: "https://www.twitter.com/anipy1".to_string(),
            icon: "https://raw.githubusercontent.com/aniketambore/personal-bitcoin-tip-card/main/assets/twitter.svg".to_string(),
        },
        SocialMedia {
            media: "Nostr".to_string(),
            link: "https://primal.net/p/npub1clqc0wnk2vk42u35jzhc3emd64c0u4g6y3su4x44g26s8waj2pzskyrp9x".to_string(),
            icon: "https://raw.githubusercontent.com/aniketambore/personal-bitcoin-tip-card/main/assets/nostr.svg".to_string(),
        },
    ];

    view! {
        <div class:social-links=true>
            <ul>
                {socials
                    .into_iter()
                    .map(|n| view! { <SocialLink media=n.media link=n.link icon=n.icon/> })
                    .collect_view()}
            </ul>
        </div>
    }
}

// Reusable component for card action buttons
#[component]
fn CardAction() -> impl IntoView {
    view! {
        <div class:btn-container=true>
            <a
                class:btn=true
                style="text-decoration:none;"
                rel="noopener"
                target="_blank"
                href="mailto:aaa.software.dev@gmail.com?subject=Job%20Opportunity&body=Hello,%0D%0A%0D%0AI%20am%20contacting%20you%20in%20response%20to%20your%20website%20and%20to%20inquire%20about%20your%20availability%20for%20a%20potential%20job%20opportunity%20as%20a%20software%20developer.%0D%0A%0D%0APlease%20let%20me%20know%20if%20you%20are%20interested%20in%20discussing%20further.%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]%0D%0A[Your%20Contact%20Information]"
            >
                Hire Me
            </a>

            <button
                class:btn=true
                on:click=move |_| {
                    logging::log!("Tip Me");
                }
            >

                Tip Me
            </button>
        </div>
    }
}

#[component]
fn Footer() -> impl IntoView {
    view! {
        <footer>
            "Made with ❤️ using"
            <a rel="noopener" target="_blank" href="https://www.rust-lang.org">
                Rust
            </a> , <a rel="noopener" target="_blank" href="https://leptos.dev">
                Leptos
            </a> and <a rel="noopener" target="_blank" href="https://open-props.style">
                Open-props.
            </a>
        </footer>
    }
}

// Main application component
#[component]
fn App() -> impl IntoView {
    view! {
        <div class:container=true>
            <Avatar/>
            <Header/>
            <SocialLinksView/>
            <CardAction/>
            <Footer/>
        </div>
    }
}

fn main() {
    console_error_panic_hook::set_once();
    mount_to_body(|| view! { <App/> })
}
