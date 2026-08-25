## It started with a problem I could feel, but could not yet name

I wanted a place I would keep returning to. Not another app that passively holds information, but something that notices what I save, helps me find it again, and becomes more useful over time.

At first, I called it a notes app. That description quickly broke down. A note might be a thought, a shopping list, a reminder, a reusable response, a document I need at an airport, or the beginning of a larger thread. Treating all of those things as pages of text made the product easy to describe, but not especially useful.

I knew I wanted strong retrieval. I imagined one intelligent surface that could see everything inside the app, answer questions, find anything, create lists, and perform actions. I wanted it to feel immediate and personal, with memory that belonged to the user.

That idea pulled me into the first major version of Found.

## The ambitious experiment

I spent a lot of time exploring on-device language models. I tested Gemma models, retrieval, tool calling, model downloads, lifecycle management, speculative decoding, memory use, time to first token, and ways to keep an assistant ready without exhausting the phone.

On a laptop, the experience could feel remarkable. The model was fast enough, the responses were good enough, and the idea of a private assistant living beside your own information felt real.

Phones exposed the harder truth.

The model could consume gigabytes of storage. Downloads failed on real networks. Verification and setup created confusing states. A high-end Pixel could eventually provide acceptable performance, but lower-end devices could not be treated as an afterthought. Keeping a large model available without choking memory was difficult. Most importantly, the engineering effort was growing faster than the value a person received from it.

The work was not wasted. It taught me what local intelligence must earn before it deserves a place in a product:

- It must respond quickly enough to feel like part of the interface.
- It must work reliably on the devices people actually own.
- It must provide a clear advantage over a simpler interaction.
- Its storage, memory, battery, and setup costs must be honest.
- Privacy alone is not enough if the experience is frustrating.

I kept semantic search because it solves a real retrieval problem with a much smaller cost. I moved the large assistant out of the core product. I may return to it when the models, operating systems, and product need meet in the right place, but I no longer want the technology to decide what Found is.

## Finding the real job

The useful question became simpler: what do people repeatedly need, but repeatedly struggle to retrieve?

The answer is rarely one giant note. It is the small collection of things that support real life and work:

- a passport scan and the documents for a visa application
- a PDF a client asks to see
- a Wi-Fi password or account number
- a link worth returning to
- a photo of a whiteboard
- a canned response that should take seconds to reuse
- a checklist connected to a trip or project
- a reminder attached to the thing itself

These items are usually scattered across notes, downloads, chats, photo libraries, email, and file managers. The files exist, but their context disappears. Finding the right one becomes a memory test.

That is the job I want Found to do.

Found is a private library for things worth finding again. It keeps notes, links, images, PDFs, CSVs, lists, reminders, and related material in one coherent place. A folder can hold the context for a trip, a client, a home project, or an application without pretending every item is the same type of object. Search should return what you remember, even when you do not remember its exact title. Sharing should preserve the original. Backups should be portable because the library belongs to the person who built it.

## Why not just use Apple Notes?

Apple Notes is an excellent notes app. Files is an excellent file manager. Found should not try to beat either by accumulating their features.

Its opportunity is the distance between storing something and using it again.

That means capture must take very little effort. Organization must preserve context without demanding constant maintenance. Search must work across different kinds of material. Reuse must be a first-class action, not the end of a long sequence of opening, selecting, copying, exporting, and switching apps.

The product is not finished merely because it can hold many file types. It becomes valuable when a person can save something once and bring it back in seconds.

## What I am building toward

The current release is intentionally local-first. The core library should remain useful without an account, a subscription, or a server holding personal material. I do not want to put basic ownership behind a paywall.

If Found earns the right to charge, the paid value should come from infrastructure that genuinely costs money and expands what the product can do. Private multi-device sync, desktop access, collaboration where it makes sense, and optional stronger intelligence are examples. Those are directions, not promises. Real use will decide which of them deserve to exist.

The next product work is focused on three outcomes:

1. Capture anything with less friction.
2. Retrieve the right thing with less precision from the user.
3. Reuse it without rebuilding its context.

System share extensions, shortcuts, widgets, richer extraction, better search, and carefully chosen automation all matter when they shorten one of those paths. Features that merely make the list longer do not.

## Why launch before it feels complete

I delayed launching because I kept trying to make the technology impressive enough to justify the product. That is the wrong test. A technically difficult feature can still solve the wrong problem, and a focused interaction can create more value than months of ambitious infrastructure.

Found is not yet the undisputed best product in this category. Pretending otherwise would make this journal useless. The point of releasing it is to replace assumptions with evidence: what people save, what they fail to find, what they reuse, where they hesitate, and whether the library becomes part of their week.

I want to build this in public because the uncomfortable decisions are part of the product. When an experiment fails, I will explain why. When the direction changes, I will explain what changed. When something works, I will show the reasoning and the tradeoffs instead of presenting it as inevitable.

The name Found is the standard I want the app to meet. Something was worth keeping. Later, at the moment it matters, it is found.
