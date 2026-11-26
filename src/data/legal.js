// The three policy pages. Text is the live site's, word for word (thelincolnmedia.com/privacy-policy,
// /terms-and-condition, /refund-policy — extracted from the pages' HTML, 2026-11-26). Only the
// presentation is ours: "- " / "●" lines are lists, h4 → sections, h5 → sub-sections.
// Two presentational substitutions, no wording changed:
//  • Terms → "Contacting Us": the live "Click Here" link is broken (javscript:;); the sentence says
//    "using the information below", so the studio's contact details (src/config/site.js) are shown below it.
//  • Refund → "Need help…": "call us via the number listed on our website" is followed by that number.
// Known wording issues on the live pages, kept as published (they are legal text — flag, don't fix):
//  • "you are eligible for either:" lists only one option (Terms + Refund, Service Delivery Issues)
//  • Refund Process: "please email to the customer support" names no address
// Block types: { type: "p", text } · { type: "list", items } · { type: "sub", title, blocks } · { type: "contact" }
// Inline: **bold** is kept from the source.

export const LEGAL_META = {
  "privacy": {
    "path": "/privacy-policy",
    "title": "Privacy Policy",
    "kicker": "Legal · Privacy",
    "summary": "How we collect, use and protect your information.",
    "seoTitle": "Privacy Policy | The Lincoln Media"
  },
  "terms": {
    "path": "/terms-and-condition",
    "title": "Terms & Conditions",
    "kicker": "Legal · Terms",
    "summary": "The terms that govern use of our website and services.",
    "seoTitle": "Terms & Conditions | The Lincoln Media"
  },
  "refund": {
    "path": "/refund-policy",
    "title": "Refund Policy",
    "kicker": "Legal · Refunds",
    "summary": "Our policy on refunds, cancellations and revisions.",
    "seoTitle": "Refund Policy | The Lincoln Media"
  }
};

export const LEGAL = {
  "privacy": {
    "intro": [
      {
        "type": "p",
        "text": "At The Lincoln Media, we respect your privacy and are committed to handling your personal information responsibly. This Privacy Policy explains how we collect, use, store, and protect information shared through our website and services."
      }
    ],
    "sections": [
      {
        "id": "commitment-to-privacy",
        "title": "Commitment to Privacy",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Our business complies with the principles to ensure all your personal information remains confidential, protected and maintained."
            ]
          }
        ]
      },
      {
        "id": "information-collection-and-purpose",
        "title": "Information Collection and Purpose",
        "blocks": [
          {
            "type": "list",
            "items": [
              "We will notify the purpose of collecting information in advance or at the time.",
              "We only collect and use the personal information conforming to the corporate objectives.",
              "We only collect personal information in compliance with the law and on consent of the concerned individual."
            ]
          }
        ]
      },
      {
        "id": "data-sharing-and-sms-privacy",
        "title": "Data Sharing and SMS Privacy",
        "blocks": [
          {
            "type": "list",
            "items": [
              "None of the personal data is shared with a third party unless required by the law.",
              "**Specifically, text messaging originator opt-in data and consent will not be shared with, sold, rented, or traded to any third parties or affiliates for marketing or promotional purposes.**"
            ]
          }
        ]
      },
      {
        "id": "data-accuracy-and-retention",
        "title": "Data Accuracy and Retention",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Personal information that is irrelevant, incomplete, outdated, inaccurate or non-compliant with the law shall be nullified."
            ]
          }
        ]
      },
      {
        "id": "data-security",
        "title": "Data Security",
        "blocks": [
          {
            "type": "list",
            "items": [
              "We ensure maximum protection of the personal data against misuse, theft or loss, unauthorised access, disclosure, duplication and/or modification."
            ]
          }
        ]
      }
    ],
    "title": "Privacy Policy"
  },
  "terms": {
    "intro": [
      {
        "type": "p",
        "text": "At Lincoln Media, we have leading industry professionals and state-of-the-art technology to ensure your business and brands lifts up on the digital front."
      }
    ],
    "sections": [
      {
        "id": "consent-to-receive-sms-messages",
        "title": "Consent to Receive SMS Messages",
        "blocks": [
          {
            "type": "p",
            "text": "By providing your phone number and explicitly checking the SMS consent box on our website forms, you consent to receive SMS messages from Lincoln Media Inc regarding customer support, project updates, and important notifications. Message frequency varies. Standard message and data rates may apply. You can opt out at any time by replying STOP to discontinue messages or HELP for more information. Your mobile information will not be shared or sold to third parties for promotional purposes. For details, please review our Privacy Policy."
          }
        ]
      },
      {
        "id": "what-information-do-we-collect",
        "title": "What information do we collect?",
        "blocks": [
          {
            "type": "p",
            "text": "We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your name, e-mail address, mailing address, phone number. You may, however, visit our site anonymously."
          }
        ]
      },
      {
        "id": "what-do-we-use-your-information-for",
        "title": "What do we use your information for?",
        "blocks": [
          {
            "type": "p",
            "text": "The information we collect from you may be used in one of the following ways:"
          },
          {
            "type": "list",
            "items": [
              "To personalize your experience - your information helps us better respond to your individual needs.",
              "To improve our website - we continually strive to improve our website offerings based on the information and feedback we receive from you.",
              "To improve customer service - your information helps us effectively respond to your customer service requests and support needs.",
              "To process transactions - your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.",
              "To send periodic emails - the email address you provide may be used to send you information, respond to inquiries, and/or other requests or questions."
            ]
          }
        ]
      },
      {
        "id": "how-do-we-protect-your-information",
        "title": "How do we protect your information?",
        "blocks": [
          {
            "type": "p",
            "text": "We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential. After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers."
          }
        ]
      },
      {
        "id": "do-we-use-cookies",
        "title": "Do we use cookies?",
        "blocks": [
          {
            "type": "p",
            "text": "Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the sites or service provider’s systems to recognize your browser and capture and remember certain information. We use cookies to keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business."
          }
        ]
      },
      {
        "id": "do-we-disclose-any-information-to-outside-parties",
        "title": "Do we disclose any information to outside parties?",
        "blocks": [
          {
            "type": "p",
            "text": "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. **However, text messaging originator opt-in data and consent will strictly not be shared with any third parties or affiliates for marketing purposes**. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses."
          }
        ]
      },
      {
        "id": "california-online-privacy-protection-act-compliance",
        "title": "California Online Privacy Protection Act Compliance",
        "blocks": [
          {
            "type": "p",
            "text": "Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent."
          }
        ]
      },
      {
        "id": "third-party-links",
        "title": "Third party links",
        "blocks": [
          {
            "type": "p",
            "text": "Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites."
          }
        ]
      },
      {
        "id": "online-privacy-policy-only",
        "title": "Online privacy policy only",
        "blocks": [
          {
            "type": "p",
            "text": "This online privacy policy applies only to information collected through our website and not to information collected offline."
          }
        ]
      },
      {
        "id": "originality-of-content",
        "title": "Originality of content",
        "blocks": [
          {
            "type": "p",
            "text": "To ensure you get the best and most original content, we do supply (on request) premium Copyscape reports. Copyscape reports check originality against text contained in html webpages that have been indexed by search engines, based on Copyscape’s own plagiarism algorithm. Any text contained in images, videos or other media, which search engines can't read will be omitted by Copyscape. Our guarantee of plagiarism free copy, guarantees that the work we do will show up as original on Copyscape reports only. The responsibility for more comprehensive and deeper plagiarism checks, than Copyscape will fall on you, as we do not cover such services in our standard prices. All work submitted upon project completion becomes your property, if it is paid for, and your responsibility."
          }
        ]
      },
      {
        "id": "use-of-images",
        "title": "Use of images",
        "blocks": [
          {
            "type": "p",
            "text": "We do not claim ownership of any of the images we recommend with any of the orders we are hired for. Nor, do we claim to transfer rights to any images. The copyright of images are solely owned by the photographer who took the image. When you are recommended an image, you get a link that you may use to stream the image. You can paste this link directly into your blog, newsletter, website, or any other online source where you would like the image to appear. You may stream the image provided and use it with full confidence. In certain cases, we may provide clients links to recommended images that they may purchase before using from a third-party. The responsibility to purchase the image before use is the responsibility of the client."
          }
        ]
      },
      {
        "id": "publication-of-images",
        "title": "Publication of images",
        "blocks": [
          {
            "type": "p",
            "text": "Depending on your project requirements, we may recommend images for you to use. Each image submitted would be linked to the original source file. It is the responsibility of the client and/or webmaster to comply with publishing guidelines of the image’s owner. This may require purchase of image and/or attribution. Lincoln Media Inc will recommend images, but ultimately it’s the website owner and/or client’s responsibility to ensure that the images published don’t infringe any copyrights."
          }
        ]
      },
      {
        "id": "no-warranty",
        "title": "No Warranty",
        "blocks": [
          {
            "type": "p",
            "text": "Under no circumstances will Lincoln Media Inc or any of its affiliates, advertisers, promoters or distribution partners be responsible for any loss or damage, including personal injury or death, resulting from anyone's use of the Site or the Service, any Content posted on the Site or transmitted to Members, or any interactions between users of the Site, whether online or offline. The Site and the Service are provided \"as is\". Lincoln Media Inc does not warrant the accuracy, adequacy, or completeness of this information and materials and expressly disclaims liability for errors or omissions in this information and materials. No warranty of any kind, implied, expressed or statutory including but not limited to the warranties of non-infringement of third party rights, title, merchantability, fitness for a particular purpose and freedom from computer virus, is given in conjunction with the information and materials. Without limitation, users are solely responsible for ensuring the accuracy and legality of any content ordered."
          }
        ]
      },
      {
        "id": "limitation-of-liability",
        "title": "Limitation of Liability",
        "blocks": [
          {
            "type": "p",
            "text": "Under no circumstances shall Lincoln Media Inc or any of its stakeholders be liable for any damage (including incidental, special, direct, punitive, exemplary, or consequential damages) which allegedly might have resulted from the use of this website or from the services rendered, this includes viruses that have been purportedly obtained from the website. In no event shall Lincoln Media Inc share in any liability that may result from the inability or ability of the user to use the content or information provided by the website."
          }
        ]
      },
      {
        "id": "unlimited-revisions-policy",
        "title": "Unlimited Revisions Policy",
        "blocks": [
          {
            "type": "p",
            "text": "We offer unlimited revisions on all projects, but only up until the point of client approval for each deliverable. After a client approves a specific deliverable, no further revision requests for that deliverable will be addressed. In the event that a project is completed but feedback has not been received for the submitted deliverables, revisions can be requested for a period of two weeks (14 days). Beyond this 14-day period, any amendments or suggestions will necessitate the initiation of a new project. Please be aware that our revision policy does not extend to changes in the original project brief. Should a revision request involve more work than initially agreed upon, or if it contradicts the terms discussed at the project's outset, we may require additional payment to accommodate these revisions. This policy ensures that both our clients’ needs and our team’s efforts are managed efficiently and fairly throughout the project lifecycle."
          }
        ]
      },
      {
        "id": "indemnification",
        "title": "Indemnification",
        "blocks": [
          {
            "type": "p",
            "text": "By agreeing to the terms of this agreement, users of the site and service agree to indemnify, defend and hold harmless Lincoln Media Inc from and against any and all claim, loss, expense or demand of liability, including attorneys' fees and costs incurred by Lincoln Media Inc and Affiliates in connection with any claim by a third party (including an intellectual property claim) arising out of (i) materials and content you submit, post or transmit, or (ii) use of the site by you in violation of these Terms of Use or in violation of any applicable law."
          }
        ]
      },
      {
        "id": "right-to-refuse-service",
        "title": "Right to Refuse Service",
        "blocks": [
          {
            "type": "p",
            "text": "As service provider, we reserve the right to refuse certain types of projects. Lincoln Media Inc does not discriminate on the basis of race, color, religion, gender, or sexual orientation however, we will not work on any of the following types of projects:"
          },
          {
            "type": "list",
            "items": [
              "Academic assignments",
              "Academic papers",
              "Academic reports",
              "Racially insensitive topics",
              "Religiously insensitive topics",
              "Malicious, slanderous, or defamatory content",
              "Erotic content",
              "Content that does not align with our ethical values"
            ]
          },
          {
            "type": "p",
            "text": "A refund will be issued to clients in case we unknowingly accept an order that we can’t work on. Please speak with a representative if you would like clarification."
          }
        ]
      },
      {
        "id": "changes-to-our-privacy-policy-and-terms",
        "title": "Changes to our Privacy Policy and Terms",
        "blocks": [
          {
            "type": "p",
            "text": "If we decide to change our privacy policy or terms, we will post those changes on this page."
          }
        ]
      },
      {
        "id": "approval-timeline-and-project-autopilot-policy",
        "title": "Approval Timeline & Project Autopilot Policy",
        "blocks": [
          {
            "type": "p",
            "text": "Lincoln Media Inc is committed to maintaining a collaborative and efficient workflow with our clients. As part of this commitment, we have a clear policy regarding client approvals for deliverables. For any service we provide, we will initially submit a single piece and await client feedback and approval before proceeding with the remaining deliverables. We will allow a maximum waiting period of two weeks for client approval. If we do not receive feedback within this timeframe, we will assume approval and proceed with the project on an 'autopilot' mode. This approach enables us to ensure that all deliverables are completed and delivered according to our agreed deadlines, maintaining the project's momentum and integrity."
          }
        ]
      },
      {
        "id": "refund-policy-service-based-refunds",
        "title": "Refund Policy Service-Based Refunds",
        "blocks": [
          {
            "type": "p",
            "text": "Since our services are custom-tailored, refunds are governed by the stage of project completion:"
          },
          {
            "type": "sub",
            "title": "Before Work Begins",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Full refund minus any payment processing fees (if applicable)."
                ]
              }
            ]
          },
          {
            "type": "sub",
            "title": "After Initial Work (Discovery or Design Phase)",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "50% refund if cancellation occurs before significant development or marketing execution."
                ]
              }
            ]
          },
          {
            "type": "sub",
            "title": "After Project Development or Execution Begins",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "No refund will be issued once major phases (such as coding) have started or been delivered."
                ]
              }
            ]
          },
          {
            "type": "sub",
            "title": "Change of Mind",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "We do not offer refunds if you simply change your mind after purchasing a service. We encourage clear communication during the consultation phase to avoid misunderstandings."
                ]
              }
            ]
          },
          {
            "type": "sub",
            "title": "Service Delivery Issues",
            "blocks": [
              {
                "type": "p",
                "text": "If we fail to deliver the agreed-upon service as per our contract or scope of work, you are eligible for either:"
              },
              {
                "type": "list",
                "items": [
                  "Corrective services at no additional cost."
                ]
              }
            ]
          },
          {
            "type": "sub",
            "title": "Third-Party Tools and Licensing",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Any payments made for third-party tools, plugins, platforms (such as hosting, CMS licensing, paid ads) are non-refundable as these are billed directly to external vendors."
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "contacting-us",
        "title": "Contacting Us",
        "blocks": [
          {
            "type": "p",
            "text": "If there are any questions regarding this privacy policy you may contact us using the information below."
          },
          {
            "type": "contact"
          }
        ]
      }
    ],
    "title": "terms and conditions"
  },
  "refund": {
    "intro": [
      {
        "type": "p",
        "text": "At Lincoln Media Inc., we prioritize client satisfaction and strive to deliver high-quality development solutions tailored to your needs. However, we understand that there may be situations where a refund is requested. Please review our refund policy carefully."
      }
    ],
    "sections": [
      {
        "id": "service-based-refunds",
        "title": "Service-Based Refunds",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Since our services are custom-tailored, refunds are governed by the stage of project completion:"
            ]
          }
        ]
      },
      {
        "id": "before-work-begins",
        "title": "Before Work Begins",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Full refund minus any payment processing fees (if applicable)."
            ]
          }
        ]
      },
      {
        "id": "after-initial-work-discovery-or-design-phase",
        "title": "After Initial Work (Discovery or Design Phase)",
        "blocks": [
          {
            "type": "list",
            "items": [
              "50% refund if cancellation occurs before significant development or marketing execution."
            ]
          }
        ]
      },
      {
        "id": "after-project-development-or-execution-begins",
        "title": "After Project Development or Execution Begins",
        "blocks": [
          {
            "type": "list",
            "items": [
              "No refund will be issued once major phases (such as coding) have started or been delivered."
            ]
          }
        ]
      },
      {
        "id": "change-of-mind",
        "title": "Change of Mind",
        "blocks": [
          {
            "type": "list",
            "items": [
              "We do not offer refunds if you simply change your mind after purchasing a service. We encourage clear communication during the consultation phase to avoid misunderstandings."
            ]
          }
        ]
      },
      {
        "id": "service-delivery-issues",
        "title": "Service Delivery Issues",
        "blocks": [
          {
            "type": "list",
            "items": [
              "If we fail to deliver a service as agreed in the contract or approved scope of work, please contact our support team. We will review the issue and determine the appropriate resolution, which may include corrective services at no additional cost.",
              "If we fail to deliver the agreed-upon service as per our contract or scope of work, you are eligible for either",
              "Corrective services at no additional cost."
            ]
          }
        ]
      },
      {
        "id": "third-party-tools-and-licensing",
        "title": "Third-Party Tools and Licensing",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Any payments made for third-party tools, plugins, platforms (such as hosting, CMS licensing, paid ads) are non-refundable as these are billed directly to external vendors."
            ]
          }
        ]
      },
      {
        "id": "refund-process",
        "title": "Refund Process",
        "blocks": [
          {
            "type": "list",
            "items": [
              "To request a refund, please email **to the customer support** within **3 business days** of the issue.",
              "Refund requests must clearly state the reason and include any supporting documentation.",
              "Approved refunds will be processed within **14 business days** to the original payment method."
            ]
          }
        ]
      },
      {
        "id": "no-guarantees",
        "title": "No Guarantees",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Due to the nature of digital services, we do not guarantee specific results such as sales, website traffic, or search engine rankings."
            ]
          }
        ]
      },
      {
        "id": "need-help-or-have-questions",
        "title": "Need help or have questions?",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Contact us at **support@thelincolnmedia.com** or call us via the number listed on our website."
            ]
          },
          {
            "type": "contact"
          }
        ]
      }
    ],
    "title": "Refund Policy"
  }
};

export const LEGAL_PAGES = ["privacy", "terms", "refund"];
