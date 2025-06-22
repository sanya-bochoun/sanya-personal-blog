import React from "react";
import defaultHeroImage from "../assets/hero-sec.jpg";
import { STYLES } from "../constants/styles";
import { cn } from "@/lib/utils";

function HeroSection({
  heroImage = defaultHeroImage,
  authorLabel = "-Author",
  authorName = "Sanya B.",
  authorBio = "I'm a full-stack app developer and avid football fan with a soft spot for dogs and cats. Whether I'm coding the next great mobile experience, exploring new travel destinations, or tinkering with cutting-edge technology, I bring the same passion and curiosity to everything I do",
  authorExtraBio = "As an app developer and football aficionado, I fuse creativity with logic in every project. Off the clock, I'm hiking new trails with my dog, curled up reading about cat behavior, or testing out the newest gadgets.",
}) {
  return (
    <section className={cn("hero-section", STYLES.layout.wrapper)}>
      <div className={cn("hero-container", `${STYLES.layout.container.mobile} ${STYLES.layout.container.desktop}`)}>
        <div className="hero-content w-full px-4 md:px-6 lg:px-8">
          <div className={cn("hero-content-wrapper", "flex flex-col md:flex-row items-center justify-between w-full gap-[16px] md:gap-[48px] md:mt-[100px]")}>
            
            {/* Left Section - Text */}
            <article className={cn("hero-text-section", STYLES.layout.flex, "w-full md:w-1/3 mt-[52px] md:mt-[60px]")}>
              <div className={cn("hero-text-card", STYLES.components.card.base, STYLES.components.card.padding, "text-right w-full")}>
                <div className="title-container h-[96px] md:h-auto">
                  <h1 className={cn("hero-title", STYLES.typography.heading.base, STYLES.typography.heading.size, "text-center md:text-right")}> 
                    <span className="block font-bold text-[44px] sm:text-[56px] md:text-[65px] leading-tight mb-4 text-left md:text-right">Stay</span>
                    <span className="block font-semibold text-[22px] sm:text-[32px] md:text-[40px] leading-tight mb-6 text-left md:text-right">Curious,<br/> Stay Motivated</span>
                  </h1>
                </div>
                {/* Mobile subtitle (ขึ้นบรรทัดใหม่ตามที่ต้องการ) */}
                <p className={cn("hero-subtitle mt-10 sm:hidden md:text-right text-gray-500 text-[15px] text-left pl-0")}> 
                  Unlock Endless Insights<br/>
                  at Your Fingertips—Your Daily<br/>
                  Spark of Inspiration and Knowledge
                </p>
                {/* Desktop/Tablet subtitle (เดิม) */}
                <p className={cn("hero-subtitle hidden sm:block mt-6 md:text-right px-2 text-gray-500 text-[17px] text-left")}> 
                  Unlock Endless Insights <br/>
                  at Your Fingertips—Your Daily <br/>
                  Spark of Inspiration and Knowledge.
                </p>
              </div>
            </article>

            {/* Center Section - Image */}
            <figure className={cn("hero-image-wrapper", "flex items-center justify-center w-full md:w-1/3 mt-0 md:mt-[60px]")}>
              <div className={cn("hero-image-container", "relative bg-[#FFFFFF] rounded-2xl overflow-hidden w-[343px] h-[470px] md:w-[386px] md:h-[529px]")}>
                <img
                  src={heroImage}
                  alt="Hero"
                  className="hero-image w-full h-full object-cover rounded-2xl"
                />
                <div className={cn("hero-image-overlay", STYLES.components.image.overlay)}></div>
              </div>
            </figure>

            {/* Right Section - Author Bio */}
            <aside className={cn("author-section", STYLES.layout.flex, "w-full md:w-1/3 pb-[24px] md:pb-0 mt-4 md:mt-[60px]")}>
              <div className={cn("author-card", STYLES.components.card.base, STYLES.components.card.padding, "text-left w-full")}>
                <div className="author-label-wrapper flex items-start mb-2">
                  <span className={cn("author-label", STYLES.typography.label.base, STYLES.typography.label.size, "h-[20px]")}>
                    {authorLabel}
                  </span>
                </div>
                
                <h3 className={cn("author-name", STYLES.typography.heading.base, "text-[24px] font-semibold leading-[32px] text-left mb-3")}>
                  {authorName}
                </h3>
                
                <div className="author-bio-container">
                  <p className={cn("author-bio", STYLES.typography.body.base, STYLES.typography.body.size, "text-left")}>
                    {authorBio}
                  </p>
                  <p className={cn("author-bio-extra", STYLES.typography.body.base, STYLES.typography.body.size, "text-left mt-4")}>
                    {authorExtraBio}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
