import React from "react";
import { ReactComponent as Linkedin } from "../../../Utility/icons/lkdn.svg";
import { ReactComponent as Facebook } from "../../../Utility/icons/fb.svg";
import { ReactComponent as Insta } from "../../../Utility/icons/insta.svg";
import { ReactComponent as Youtube } from "../../../Utility/icons/yt.svg";
import "./footer.css";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="disclaimer">
          <div className="disclaimer_content">
            Disclaimer:All specifications/figures are indicative only and
            subject to requisite certification(s). Declared certified range
            figures are as per ARAI IDC standard testing conditions, actual
            performance figures may vary depending on various conditions
            including driving patterns etc. Degradation/performance of the
            battery shall be solely determined by Ather. Ather may form
            partnerships or alliances with third parties from time to time in
            order to facilitate the provision of its products and services.
            Specifications, pricing and product availability are subject to
            change without notice. Prices shown for Pro and Ather Battery
            Protect are discounted and will be applicable only if the customer
            purchases them along with the scooter. Images shown on the website
            are for representation purposes only. To know more about the
            inclusions refer to the Specifications or visit your nearest Ather
            Space. To know all about the change in product configurations and
            inclusions get in touch with your nearest Ather Space. Please follow
            applicable laws while using the vehicle. Ather Energy's trademarks
            are listed at https://atherenergy.com/trademarks. All third party
            trademarks (including words, logos and icons) referenced by Ather
            Energy Private Limited remain the property of their respective
            owners. Ather Grid map shown is only indicative and not an exact
            representation of the GPS coordinates of the Ather Grid locations.
          </div>
        </div>
        <div className="link_footer_container">
          <div className="link_content">
            <div className="links_all">
              <ul className="footer_links">
                <li>Explore</li>
                <li>EvoSwap</li>
                <li>airHwak</li>
                <li>Grow Minder</li>
                <li>CrowdTracker</li>
              </ul>
              <ul className="footer_links">
                <li>Ownership</li>
                <li>Teific Pvt. Ltd</li>
                <li>Teific Corporation</li>
              </ul>
              <ul className="footer_links">
                <li>Partnership</li>
                <li>Retail Partnership</li>
                <li>TATA Group</li>
              </ul>
              <ul className="footer_links">
                <li>Support</li>
                <li>FAQs</li>
                <li>Help & Support</li>
              </ul>
              <ul className="footer_links">
                <li>Company</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="policy_section">
              <div className="logo_policy_section">
                Te<span>i</span>fic
              </div>
              <div className="all_policies">
                <span>Terms</span>
                <span>Privacy policy</span>
                <span>Refund Policy</span>
                <span>Warranty</span>
              </div>
            </div>
            <div className="last_section">
              <div className="adress">
                <div className="adress_office">
                  <p>Registered Office Address</p>
                  Ather Energy Private Limited, 3rd Floor, Tower D, IBC
                  Knowledge Park, #4/1, Bannerghatta Main Road, Bangalore,
                  Karnataka 560029, India
                </div>
                <div className="adress_office">
                  <p>Tel No: +91-7676600900</p>
                  <p>Contact Person: Manager - Customer Services</p>
                  <p>
                    For Customer Support please write to :
                    customercare@atherenergy.com
                  </p>
                  <p>
                    For general inquiry please write to : info@atherenergy.com
                  </p>
                </div>
              </div>
              <div className="soical_handlers">
                <span>
                  <Linkedin className="last_svg" />
                </span>
                <span>
                  <Facebook className="last_svg" />
                </span>
                <span>
                  <Insta className="last_svg" />
                </span>
                <span>
                  <Youtube className="last_svg" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
