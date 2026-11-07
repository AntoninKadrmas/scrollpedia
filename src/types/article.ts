export interface ResponseArticle {
  id: string;
  slug: string;
  title: string;
  updated: string;
  topic_path: TopicPath[];
  geo: Geo[];
  excerpt: string;
  snippet: string;
  node: string;
  markdown: string;
  same_as: any[];
  url: string;
  markdown_url: string;
  license: License;
  credit: string;
  credit_md: string;
  credit_html: string;
  speakable: string;
}

export interface TopicPath {
  id: string;
  label: string;
  api_url: string;
}

export interface Geo {
  id: string;
  label: string;
  api_url: string;
  path: Path[];
}

export interface Path {
  id: string;
  label: string;
  api_url: string;
}

export interface License {
  name: string;
  url: string;
  summary: string;
  spdx: string;
}

export const MockArticle = {
  id: "ep98xk0ge4",
  slug: "jacob-reses",
  title: "Jacob Reses",
  updated: "2026-10-25",
  topic_path: [
    {
      id: "society",
      label: "Society and history",
      api_url: "https://www.edgechat.ai/api/v1/topics/society",
    },
    {
      id: "society.politics",
      label: "Politics and government",
      api_url: "https://www.edgechat.ai/api/v1/topics/society.politics",
    },
    {
      id: "society.politics.institutions",
      label: "Government and public administration",
      api_url:
        "https://www.edgechat.ai/api/v1/topics/society.politics.institutions",
    },
    {
      id: "society.politics.institutions.politicians_and_officeholders",
      label: "Politicians and government officeholders (biographies)",
      api_url:
        "https://www.edgechat.ai/api/v1/topics/society.politics.institutions.politicians_and_officeholders",
    },
    {
      id: "society.politics.institutions.politicians_and_officeholders.us-senators",
      label: "US senators",
      api_url:
        "https://www.edgechat.ai/api/v1/topics/society.politics.institutions.politicians_and_officeholders.us-senators",
    },
  ],
  geo: [
    {
      id: "geo.us.t2001.society.politics.institutions.politicians_and_officeholders.us-senators",
      label: "United States · 2001 to 2020: US senators",
      api_url:
        "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society.politics.institutions.politicians_and_officeholders.us-senators",
      path: [
        {
          id: "geo.us",
          label: "United States",
          api_url: "https://www.edgechat.ai/api/v1/geo/geo.us",
        },
        {
          id: "geo.us.t2001",
          label: "United States · 2001 to 2020",
          api_url: "https://www.edgechat.ai/api/v1/geo/geo.us.t2001",
        },
        {
          id: "geo.us.t2001.society",
          label: "Society and history",
          api_url: "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society",
        },
        {
          id: "geo.us.t2001.society.politics",
          label: "Politics and government",
          api_url:
            "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society.politics",
        },
        {
          id: "geo.us.t2001.society.politics.institutions",
          label: "Government and public administration",
          api_url:
            "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society.politics.institutions",
        },
        {
          id: "geo.us.t2001.society.politics.institutions.politicians_and_officeholders",
          label: "Politicians and government officeholders (biographies)",
          api_url:
            "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society.politics.institutions.politicians_and_officeholders",
        },
        {
          id: "geo.us.t2001.society.politics.institutions.politicians_and_officeholders.us-senators",
          label: "US senators",
          api_url:
            "https://www.edgechat.ai/api/v1/geo/geo.us.t2001.society.politics.institutions.politicians_and_officeholders.us-senators",
        },
      ],
    },
  ],
  excerpt:
    "Jacob Reses, American political advisor and chief of staff to Vice President JD Vance from January 2025, formerly Vance's Senate chief of staff, Princeton and Stanford Law graduate, leaving the administration in summer 2026.",
  snippet:
    "Jacob Reses, American political advisor and chief of staff to Vice President JD Vance from January 2025, formerly Vance's Senate chief of staff, Princeton and Stanford Law graduate, leaving the administration in summer 2026.",
  node: "society.politics.institutions.politicians_and_officeholders.us-senators",
  markdown:
    "# Jacob Reses\n\n**Jacob Reses** (born around 1990) is an American political advisor who served as chief of staff to Vice President JD Vance from January 20, 2025, having previously held the same role in Vance's United States Senate office. He announced in June 2026 that he would leave the administration at the end of that summer.<sup>[1](https://www.notus.org/trump-transition/jd-vance-senior-staff-vp-office)</sup><sup> • </sup><sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup> A New Jersey native from an Orthodox Jewish family, he converted from Democratic politics to conservatism as a Princeton undergraduate and built his career at Heritage Action, in Senator Josh Hawley's office, and alongside Vance since 2021.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[4](https://jewishinsider.com/2026/06/longtime-vance-chief-of-staff-jacob-reses-to-depart/)</sup>\n\n| Key fact | Detail |\n|---|---|\n| Current role | Chief of staff to Vice President JD Vance from January 20, 2025; previously Vance's Senate chief of staff<sup>[1](https://www.notus.org/trump-transition/jd-vance-senior-staff-vp-office)</sup> |\n| Departure | Announced June 2026 to leave at the end of the summer, after his wife became pregnant; Nick Luna named as successor<sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup><sup> • </sup><sup>[5](https://www.thedailybeast.com/vance-hires-new-maga-chief-of-staff-nick-luna/)</sup> |\n| Education | Princeton University (Class of 2013, School of Public and International Affairs); law degree from Stanford University, 2023<sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup> |\n| Earlier posts | Director of strategic initiatives at Heritage Action; senior policy adviser to Senator Josh Hawley from 2019<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup> |\n| Recognition | Forbes 30 Under 30, law and policy, 2018<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup> |\n| Background | Grew up in Linwood, New Jersey, in an Orthodox Jewish family; grandfather escaped the Holocaust in Lithuania<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup> |\n\n## Early life and education\n\nReses grew up in Linwood, New Jersey, and attended Trocki Hebrew Academy, a Modern Orthodox Jewish day school in Margate, before graduating as valedictorian of Mainland Regional High School.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup> His family history shaped his early identity: his maternal grandfather escaped Nazi rule in [Lithuania](https://www.edgechat.ai/lithuania), and several relatives were killed in the Holocaust.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup>\n\nAs a teenager he was a Democrat. A photo of him with Senator John Kerry hung in his childhood bedroom, and before finishing his freshman year at Princeton he had interned for both Kerry and [Hillary Clinton](https://www.edgechat.ai/hillary-clinton). As a high school senior he campaigned for a $42 million local referendum to fund repairs at the public school, which passed.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup>\n\nReses began at Princeton in fall 2009 and, while there, studied in the School of Public and International Affairs (at that time called the Woodrow Wilson School) and belonged to Mathey College. He wrote columns for *The Daily Princetonian*, edited the conservative magazine *Princeton Tory*, led Tigers for Israel, and served as president of the College Republicans, canvassing for [Mitt Romney](https://www.edgechat.ai/mitt-romney) in 2012. During his summers he returned to Washington to intern for [Tucker Carlson](https://www.edgechat.ai/tucker-carlson)'s *Daily Caller* website.<sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup> His 128-page senior thesis, advised by Stanford professor Brandice Canes-Wrone, then vice dean of the school, focused on budget reform policies and the unified federal budget.<sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup> He later said that conversations with mentors led him to believe the Republican Party was \"giving a voice to disenfranchised Americans on issues like Obamacare and immigration,\" and in a 2017 interview that \"Princeton changed me and changed my view of the world.\"<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[6](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)</sup>\n\n## Heritage Action and the Hawley office\n\nA few months after graduating, Reses joined Heritage Action for America, the lobbying arm of the Heritage Foundation, where he eventually became director of strategic initiatives.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup><sup> • </sup><sup>[7](https://forbes-forbescom-live.non-prod.zephrcf.com/profile/jacob-reses/)</sup> He drafted Heritage Action's Presidential Platform Review, which evaluated every presidential candidate's policy positions during the 2016 primaries, and was the organization's point person on the effort to repeal the [Affordable Care Act](https://www.edgechat.ai/affordable-care-act).<sup>[7](https://forbes-forbescom-live.non-prod.zephrcf.com/profile/jacob-reses/)</sup> Ahead of the 2016 election, the candidate ratings he drafted gave Donald Trump a low score and top marks to Senator Ted Cruz; when Trump moved toward the nomination, Reses and Heritage Action president Michael A. Needham wrote an essay in *National Review* calling on conservatives to double down on traditional limited-government conservatism.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup> In 2018, Forbes named him to its 30 Under 30 list in law and policy.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup>\n\nWhen [Josh Hawley](https://www.edgechat.ai/josh-hawley) entered the Senate in 2019, Reses became one of his senior policy advisers. During that time Hawley worked on legislation to regulate technology platforms over privacy, child welfare, and antitrust concerns, and pushed for a tougher stance against China. After less than two years, Reses left to enroll at Stanford Law School, where he joined the campus [Federalist Society](https://www.edgechat.ai/federalist-society) chapter, and also served as a legal fellow at the Tikvah Fund, a think tank dedicated to joining Jewish tradition and conservatism.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup>\n\n## Chief of staff to Vance\n\nReses became a confidante of JD Vance in 2021, advising him through the 2022 primary and general election for Ohio's Senate seat, and Vance named him chief of staff immediately after winning.<sup>[4](https://jewishinsider.com/2026/06/longtime-vance-chief-of-staff-jacob-reses-to-depart/)</sup> Axios described him as a longtime personal friend of Vance and a policy wonk of the movement-conservative wing, and reported that he spent the final four months of the 2024 campaign constantly on the road with Vance as his traveling chief of staff.<sup>[8](https://www.axios.com/2024/11/08/jd-vance-trump-vp-staff)</sup> When Vance was elected vice president, Reses moved with him: he was named chief of staff to the vice president in the [Eisenhower Executive Office Building](https://www.edgechat.ai/eisenhower-executive-office-building), part of a senior staff drawn largely from Vance's Senate office.<sup>[1](https://www.notus.org/trump-transition/jd-vance-senior-staff-vp-office)</sup>\n\nReporting during his tenure described him as one of the most influential figures in Vance's orbit, playing a major role in shaping the vice president's domestic political agenda; some insiders told *The Daily Beast* that his influence over foreign policy rivaled that of Vance's own national security adviser.<sup>[9](https://www.thedailybeast.com/jd-vances-top-aide-ditches-the-trump-administration/)</sup> His prior work for Hawley, who introduced a series of [Big Tech](https://www.edgechat.ai/big-tech) antitrust bills, was noted as relevant background as Vance and his allies pushed antitrust policy against large technology firms.<sup>[10](https://www.axios.com/2025/04/15/vance-antitrust-big-tech-corporations)</sup>\n\n**Departure.** In June 2026, Reses announced he would leave the administration at the end of the summer, a little over a year before the next presidential campaign, in which Vance was expected to be a frontrunner. He had informed Vance months earlier, after his wife became pregnant with their first child. Vance called him a loyal advisor and friend \"by my side for my whole career in public life,\" and White House chief of staff [Susie Wiles](https://www.edgechat.ai/susie-wiles) praised his service from \"diplomacy and war\" to \"the most minute logistics.\"<sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup><sup> • </sup><sup>[9](https://www.thedailybeast.com/jd-vances-top-aide-ditches-the-trump-administration/)</sup> In June 2026, Vance named [Nick Luna](https://www.edgechat.ai/nick-luna), director of [Oval Office](https://www.edgechat.ai/oval-office) operations during the first Trump administration, as his new chief of staff, expected to take the role in August.<sup>[5](https://www.thedailybeast.com/vance-hires-new-maga-chief-of-staff-nick-luna/)</sup>\n\n## Jewish identity and public positions\n\nReses is among the most prominent Jewish officials in Vance's circle, and his identity drew attention in a campaign season marked by rising [Christian nationalism](https://www.edgechat.ai/christian-nationalism) in the Republican Party.<sup>[3](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)</sup> In January 2026, Vance took part in Reses's wedding to Rachel Altman at an Orthodox synagogue in [Rockville, Maryland](https://www.edgechat.ai/rockville-maryland), delivering a [Jewish prayer](https://www.edgechat.ai/jewish-prayer) under the chuppah.<sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup>\n\nIn March 2026, a profile in *New York Magazine* found that Reses, through a private X account of his, boosted voices urging Jews to go along with, instead of push back against, the Christian nationalist strand gaining strength inside the GOP, and that in September 2025 he had shared again an approving quote from Palantir co-founder Joe Lonsdale of a statement contending that Jews ought to no longer feel uneasy about Christian expressions in public. The Jewish Telegraphic Agency noted that this reported alignment with Vance's reluctance to confront right-wing antisemitism did not spare Reses from antisemitic attacks, including an article on a white-nationalist website headlined \"Another Nail in the Coffin — Jew Runs J. D. Vance.\"<sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup><sup> • </sup><sup>[11](https://www.jta.org/2026/03/26/politics/vances-jewish-chief-of-staff-shares-his-approach-to-right-wing-antisemitism-new-profile-reveals)</sup> Matt Brooks, chief executive of the Republican Jewish Coalition, praised him at his departure as a \"proud Jewish American, whose own family story carries the weight of our people's history.\"<sup>[2](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)</sup>\n\n## References\n\n1. [JD Vance Is Bringing His Senior Senate Staff to His VP Office, NOTUS (January 17, 2025)](https://www.notus.org/trump-transition/jd-vance-senior-staff-vp-office)\n2. [Jacob Reses, Vance's Jewish chief of staff, to leave US administration, The Times of Israel (June 12, 2026)](https://www.timesofisrael.com/jacob-reses-vances-jewish-chief-of-staff-to-leave-us-administration/)\n3. [Meet JD Vance's Jewish chief of staff, Jacob Reses, The Times of Israel (August 1, 2024)](https://www.timesofisrael.com/meet-jd-vances-jewish-chief-of-staff-jacob-reses/)\n4. [Vance Chief of Staff Jacob Reses to depart Trump administration, Jewish Insider (June 11, 2026)](https://jewishinsider.com/2026/06/longtime-vance-chief-of-staff-jacob-reses-to-depart/)\n5. [Vance Hires New MAGA Chief of Staff, The Daily Beast (June 16, 2026)](https://www.thedailybeast.com/vance-hires-new-maga-chief-of-staff-nick-luna/)\n6. [J.D. Vance's chief of staff Jacob Reses '13, a 'very considerate' intellectual at Princeton, The Daily Princetonian (December 12, 2024)](https://www.dailyprincetonian.com/article/2024/12/princeton-news-broadfocus-jacob-reses-jd-vance-chief-of-staff-trump-administration)\n7. [Jacob Reses profile, Forbes (last updated January 3, 2018)](https://forbes-forbescom-live.non-prod.zephrcf.com/profile/jacob-reses/)\n8. [Scoop: Vice President-elect JD Vance's inner circle, Axios (November 8, 2024)](https://www.axios.com/2024/11/08/jd-vance-trump-vp-staff)\n9. [Vance's Top Aide Ditches the Trump Administration, The Daily Beast (June 11, 2026)](https://www.thedailybeast.com/jd-vances-top-aide-ditches-the-trump-administration/)\n10. [Vance allies set to flex antitrust muscle against Big Tech, Axios (April 15, 2025)](https://www.axios.com/2025/04/15/vance-antitrust-big-tech-corporations)\n11. [Vance's Jewish chief of staff shares his approach to right-wing antisemitism, new profile reveals, Jewish Telegraphic Agency (March 26, 2026)](https://www.jta.org/2026/03/26/politics/vances-jewish-chief-of-staff-shares-his-approach-to-right-wing-antisemitism-new-profile-reveals)\n\n---\n*Topic: Encyclopedia › Society and history › Politics and government › Government and public administration › Politicians and government officeholders (biographies) › US senators*\n\n*Initially written Sep 17, 2026 · Reviewed: Sep 30, 2026; Oct 25, 2026 · Edited: Sep 30, 2026; Oct 11, 2026; Oct 25, 2026 · Last review: Oct 25, 2026*\n\n*Copyright 2026 EdgeChat AI, a subsidiary of Biostate AI.*\n\nLicense: Edgepedia Community License 1.0, https://www.edgechat.ai/edgepedia/license\n",
  same_as: [],
  url: "https://www.edgechat.ai/jacob-reses",
  markdown_url: "https://www.edgechat.ai/jacob-reses.md",
  license: {
    name: "Edgepedia Community License 1.0",
    url: "https://www.edgechat.ai/edgepedia/license",
    summary:
      "Free with credit, commercial use included. AI training is open to everyone. For other uses, organizations over USD 100M in revenue or 100M monthly users license separately.",
    spdx: "LicenseRef-Edgepedia-Community-1.0",
  },
  credit:
    '"Jacob Reses", Edgepedia (EdgeChat), https://www.edgechat.ai/jacob-reses. Edgepedia Community License 1.0.',
  credit_md:
    '"[Jacob Reses](https://www.edgechat.ai/jacob-reses)", Edgepedia (EdgeChat), [https://www.edgechat.ai/jacob-reses](https://www.edgechat.ai/jacob-reses). [Edgepedia Community License 1.0](https://www.edgechat.ai/edgepedia/license).',
  credit_html:
    '"<a href="https://www.edgechat.ai/jacob-reses">Jacob Reses</a>", Edgepedia (EdgeChat), <a href="https://www.edgechat.ai/jacob-reses">https://www.edgechat.ai/jacob-reses</a>. <a href="https://www.edgechat.ai/edgepedia/license">Edgepedia Community License 1.0</a>.',
  speakable:
    "Jacob Reses, American political advisor and chief of staff to Vice President JD Vance from January 2025, formerly Vance's Senate chief of staff, Princeton and Stanford Law graduate, leaving the administration in summer 2026.",
};
