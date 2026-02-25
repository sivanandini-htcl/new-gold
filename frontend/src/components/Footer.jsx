// function Footer(){
//     return(<>
//     {/* main-footer */}
//         <footer className="relative bg-theme-dark">
//             <div className="absolute t-0 r-0 w-full h-full bg-no-repeat bg-right-top" style="background-image: url(assets/images/shape/shape-12.png);"></div>
//             <div className="max-w-[1310px] mx-auto pl-[15px] pr-[15px]">
//                 <div className="grid relative grid-cols-1 lg:grid-cols-12 gap-7 items-center border-b border-[rgba(217,217,217,0.3)] sm:mb-0 mb-10 sm:pt-[115px] pt-20 sm:pb-20 pb-20">
//                     <div className="md:col-span-6">
//                         <figure className="mb-10"><a href="index.html"><img src="assets/images/logo-2.png" alt=""/></a></figure>
//                         <p className="text-white mb-[46px] max-w-[480px]">For many traders, FXTrade has ability to open and close positions instantly, access leverage and monitor account balances in real-time is essential for staying ahead.</p>
//                         <ul className="social-links relative flex items-center gap-[8px]">
//                             <li><a href="index.html" className="relative text-[16px] inline-block w-[34px] h-[34px] leading-[34px] text-center rounded text-[#ffffff] bg-[#2C3F6C] transition-all hover:bg-yellow-500"><i className="icon-2"></i></a></li>
//                             <li><a href="index.html" className="relative text-[16px] inline-block w-[34px] h-[34px] leading-[34px] text-center rounded text-[#ffffff] bg-[#2C3F6C] transition-all hover:bg-yellow-500"><i className="icon-3"></i></a></li>
//                             <li><a href="index.html" className="relative text-[16px] inline-block w-[34px] h-[34px] leading-[34px] text-center rounded text-[#ffffff] bg-[#2C3F6C] transition-all hover:bg-[#FEBD58]"><i className="icon-4"></i></a></li>
//                             <li><a href="index.html" className="relative text-[16px] inline-block w-[34px] h-[34px] leading-[34px] text-center rounded text-[#ffffff] bg-[#2C3F6C] transition-all hover:bg-[#FEBD58]"><i className="icon-5"></i></a></li>
//                             <li><a href="index.html" className="relative text-[16px] inline-block w-[34px] h-[34px] leading-[34px] text-center rounded text-[#ffffff] bg-[#2C3F6C] transition-all hover:bg-[#FEBD58]"><i className="icon-6"></i></a></li>
//                         </ul>
//                     </div>
                    
//                     <div className="md:col-span-6">
//                         <p className="text-[#D9D9D9] mb-10 font-bold"><a href="index.html" className="font-medium text-[20px] inline-block border-b border-[#ffffff] text-white hover:text-yellow-500">USA Office</a>&nbsp;&nbsp;Suite # 369, Westview Road, New York 12345</p>
//                         <div className="inner-box sm:flex block item-center sm:gap-14">
//                             <div className="single-item flex mb-7 sm:mb-0 items-center gap-[15px]">
//                                 <div className="w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-blue-600 text-[24px] text-yellow-500"><i className="icon-21"></i></div>
//                                 <div className="text-box">
//                                     <p className="text-white mb-0.5">Reach out via email</p>
//                                     <a href="mailto:trading-fx@example.com" className="text-[18px] leading-[22px] font-semibold text-white hover:text-yellow-500">trading-fx@example.com</a>
//                                 </div>
//                             </div>
//                             <div className="single-item flex items-center gap-[15px]">
//                                 <div className="w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-blue-600 text-[24px] text-yellow-500"><i className="icon-22"></i></div>
//                                 <div className="text-box">
//                                     <p className="text-white mb-0.5">Get 24/7 Support</p>
//                                     <a href="tel:9992223456" className="text-[18px] leading-[22px] font-semibold text-white hover:text-yellow-500">Call us (999) 222 3456</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="grid relative grid-cols-1 lg:grid-cols-12 gap-7 border-b border-[rgba(217,217,217,0.3)] pt-20 sm:pb-[115px] pb-20 before:absolute before:left-1/2 before:top-0 before:w-[1px] before:h-full before:content-[''] lg:before:block before:hidden before:border-l before:border-[rgba(217,217,217,0.3)]">
//                     <div className="md:col-span-6">
//                         <div className="lg:max-w-[483px] lg:mb-0 mb-10 w-full rounded-[24px] bg-yellow-500 sm:p-[50px] p-7">
//                             <h3 className="text-[28px] leading-9 mb-4 text-title-color">Join our Community</h3>
//                             <p className="mb-8 text-title-color">Morbi donec leo eget faucibus sed rhoncus porttitor ipsum sodales dui nunc.</p>
//                             <form action="https://html.tonatheme.com/2025/Fxtrade/contact.html" method="post">
//                                 <div className="relative">
//                                     <input type="email" name="email" placeholder="Email Address....." required className="pr-20 peer" />
//                                     <button type="submit" className="absolute top-1.5 right-2 rounded-full w-[54px] h-[54px] leading-[54px] text-center bg-theme-dark duration-500 text-base text-white hover:bg-blue-600 cursor-pointer peer-focus:bg-blue-600"><i className="icon-8"></i></button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     <div className="md:col-span-6">
//                         <div className="grid relative grid-cols-1 sm:grid-cols-12 gap-7">
//                             <div className="sm:col-span-6 xl:ml-[130px]">
//                                 <h6 className="text-base leading-[26px] text-white mb-[25px]">Useful Links</h6>
//                                 <ul>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Home</a></li>
//                                     <li><a href="about.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">About Forex</a></li>
//                                     <li><a href="trade.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Trading Platform</a></li>
//                                     <li><a href="trade.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Services We Offer</a></li>
//                                     <li><a href="contact.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Contact us</a></li>
//                                     <li><a href="blog.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Latest News</a></li>
//                                 </ul>
//                             </div>
//                             <div className="sm:col-span-6 xl:ml-[130px]">
//                                 <h6 className="text-base leading-[26px] text-white mb-[25px]">Trading</h6>
//                                 <ul>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Market Rates</a></li>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Evaluation</a></li>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Affiliates Program</a></li>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Pricing Structure</a></li>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Trading Rules</a></li>
//                                     <li><a href="index.html" className="text-[19px] text-white leading-12 hover:text-yellow-500">Get Funded</a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="footer-bottom relative md:flex text-center items-center justify-center gap-4 pt-[60px] pb-16">
//                     <p className="text-[#999999]">&copy; Copyrights 2025 - <a href="index.html" className="text-[#999999] hover:text-yellow-500">FXTrade</a> Trading Template. All Rights Reserved.</p>
//                     <a href="index.html" className="text-[#999999] hover:text-yellow-500 underline">Terms & Conditions</a>
//                     <a href="index.html" className="text-[#999999] hover:text-yellow-500 underline">Terms & Conditions</a>
//                 </div>
//             </div>
//         </footer>
//        {/* main-footer end */}
//     </>)
// }
// export default Footer;