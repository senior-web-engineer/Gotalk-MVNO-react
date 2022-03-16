/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import routes from '../../../navigation/routes';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer-pages.scss';

const TermsConditions = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="section-information-pages">
      <h2 className="information-pages__title">Terms & Conditions</h2>
      <p className="information-pages__paragraph">
        Thanks for choosing Go Talk. Please read these Terms & Conditions (“T&Cs”), which contain
        important information about your relationship with Go Talk, including mandatory arbitration
        of disputes between us, instead of class actions or jury trials. You will become bound by
        these provisions once you accept these T&Cs.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHO IS THIS AGREEMENT WITH?</h3>
        These T&Cs are an agreement between you and us, Go Talk USA, LLC, and our controlled
        subsidiaries, assignees, and agents
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">HOW DO I ACCEPT THESE T&Cs?</h3>
        You accept these T&Cs by doing any of the following things:giving us a written or electronic
        signature or confirmation, or telling us orally that you accept;activating, using or paying
        for the Service or a Device; oropening the Device box.If you don’t want to accept these
        T&Cs, don’t do any of these things.When you accept, you're telling us that you are of legal
        age (which means you are either legally emancipated, or have reached the age of majority as
        defined in your jurisdiction) and that you are able to enter into a contract. If you accept
        for an organization, you're telling us that you are authorized to bind that organization,
        and references to "you" in these T&Cs may mean the organization.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          WHAT IS INCLUDED IN THESE TERMS AND CONDITIONS?
        </h3>
        In these T&Cs, you'll find important information about:Go Talk services provided to you
        (“Service”);Any equipment for which we provide Service or which we provide to you to be used
        with our Service, such as a phone, handset, tablet, SIM card, or accessory (collectively, a
        “Device”);Any charges, taxes, fees, and other amounts we bill you or that were accepted or
        processed through your Device (“Charges”);Privacy information;Network management
        practices;Limitations of liability; andResolution of disputes by arbitration and class
        action and jury trial waivers.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          ARE THERE ANY OTHER TERMS THAT APPLY TO ME?
        </h3>
        On Demand Lease Yes. Your "Agreement" includes these T&Cs, the additional terms found in
        your Rate Plan, your Data Plan, your Service Agreement, and provisions linked to from these
        T&Cs. Sections marked “*” continue after termination of our Agreement with you.You should be
        aware that our Privacy Notice, located at
        <a className="link-support" href={routes.privacy}>
          {' '}
          www.Gotalkwireless.com/privacy
          {' '}
        </a>
        and Open Internet Policy, located at
        <a className="link-support" href={`${routes.home}#map-section`}>
          {' '}
          www.Gotalkwireless.com/coverage
          {' '}
        </a>
        , apply to the use of our products and services. You might also have other agreements with
        us, such as an equipment installment plan or JUMP! Agreement.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*HOW DO I RESOLVE DISPUTES WITH GO TALK?</h3>
        By accepting these T&Cs, you are agreeing to resolve any dispute with us through binding
        arbitration or small claims dispute procedures (unless you opt out), and to waive your
        rights to a jury trial and to participate in any class action suit. For additional terms and
        conditions governing a dispute between us, including how to dispute Charges assessed to you
        on your bill, choice of law, disclaimers of certain warranties, limitations of liabilities,
        and your indemnification obligations, see “Other Terms Regarding Dispute Resolution” below.
      </p>
      <p className="information-pages__paragraph">
        Dispute Resolution and Arbitration. YOU AND WE EACH AGREE THAT, EXCEPT AS PROVIDED BELOW,
        ANY AND ALL CLAIMS OR DISPUTES IN ANY WAY RELATED TO OR CONCERNING THE AGREEMENT, OUR
        PRIVACY NOTICE, OUR SERVICES, DEVICES OR PRODUCTS, INCLUDING ANY BILLING DISPUTES, WILL BE
        RESOLVED BY BINDING ARBITRATION OR IN SMALL CLAIMS COURT. This includes any claims against
        other parties relating to Services or Devices provided or billed to you (such as our
        suppliers, dealers, authorized retailers, or third-party vendors) whenever you also assert
        claims against us in the same proceeding. You and we each also agree that the Agreement
        affects interstate commerce so that the Federal Arbitration Act and federal arbitration law,
        not state law, apply and govern the enforceability of this dispute resolution provision
        (despite the general choice of law provision set forth below). THERE IS NO JUDGE OR JURY IN
        ARBITRATION, AND COURT REVIEW OF AN ARBITRATION AWARD IS LIMITED. THE ARBITRATOR MUST FOLLOW
        THIS AGREEMENT AND CAN AWARD THE SAME DAMAGES AND RELIEF AS A COURT (INCLUDING ATTORNEYS’
        FEES).
      </p>
      <p className="information-pages__paragraph">
        For Puerto Rico customers, references to "small claims court" should be understood to mean
        the Puerto Rico Telecommunications Regulatory Board (“TRB”) for matters within the
        jurisdiction of said agency. See OTHER TERMS REGARDING DISPUTE RESOLUTION for details on the
        billing dispute process in Puerto Rico.
      </p>
      <p className="information-pages__paragraph">
        Notwithstanding the above, YOU MAY CHOOSE TO PURSUE YOUR CLAIM IN COURT AND NOT BY
        ARBITRATION IF YOU OPT OUT OF THESE ARBITRATION PROCEDURES WITHIN 30 DAYS FROM THE EARLIER
        OF THE DATE YOU PURCHASED A DEVICE FROM US OR THE DATE YOU ACTIVATED A NEW LINE OF SERVICE
        (the “Opt Out Deadline”). You must opt out by the Opt Out Deadline for each line of Service.
        You may opt out of these arbitration procedures by calling 1-866-323-4405 or online at
        <a className="link-support" href={routes.home}>
          {' '}
          www.GoTalkdisputeresolution.com
          {' '}
        </a>
        Any opt-out received after the Opt Out Deadline will not be valid and you will be required
        to pursue your claim in arbitration or small claims court.
      </p>
      <p className="information-pages__paragraph">
        For any and all disputes or claims you have, you must first give us an opportunity to
        resolve your claim by sending a written description of your claim to the address provided in
        the “How Do We Notify Each Other” Section below. You and we each agree to negotiate your
        claim in good faith. You agree that you may not commence any arbitration or court proceeding
        unless you and we are unable to resolve the claim within 60 days after we receive your claim
        description and you have made a good faith effort to resolve your claim directly with us
        during that time.
      </p>
      <p className="information-pages__paragraph">
        If we are unable to resolve your claim within 60 days despite those good faith efforts, then
        either you or we may start arbitration or small claims court proceedings. To begin
        arbitration, you must send a letter requesting arbitration and describing your claim to our
        registered agent (see the “How Do We Notify Each Other” section below) and to the American
        Arbitration Association (“AAA”). The arbitration of all disputes will be administered by the
        AAA under its Consumer Arbitration Rules in effect at the time the arbitration is commenced,
        except to the extent any of those rules conflicts with our agreement in these T&Cs, in which
        case these T&Cs will govern. The AAA rules are available at
        <a className="link-support" href="www.adr.org">
          {' '}
          www.adr.org
          {' '}
        </a>
        If the claims asserted in any request or demand for arbitration could have been brought in
        small claims court, then either you or we may elect to have the claims heard in small claims
        court, rather than in arbitration, at any time before the arbitrator is appointed, by
        notifying the other party of that election in writing. The arbitration of all disputes will
        be conducted by a single arbitrator, who shall be selected using the following procedure:
        (a) the AAA will send the parties a list of five candidates; (b) if the parties cannot agree
        on an arbitrator from that list, each party shall return its list to the AAA within 10 days,
        striking up to two candidates, and ranking the remaining candidates in order of preference;
        (c) the AAA shall appoint as arbitrator the candidate with the highest aggregate ranking;
        and (d) if for any reason the appointment cannot be made according to this procedure, the
        AAA may exercise its discretion in appointing the arbitrator. Upon filing of the arbitration
        demand, we will pay or reimburse all filing, administration, and arbitrator fees. An
        arbitrator may award on an individual basis any relief that would be available in a court,
        including injunctive or declaratory relief and attorneys’ fees. In addition, for claims
        under $75,000 as to which you provided notice and negotiated in good faith as required above
        before initiating arbitration, if the arbitrator finds that you are the prevailing party in
        the arbitration, you will be entitled to recover reasonable attorneys’ fees and costs.
        Except for claims determined to be frivolous, we agree not to seek attorneys’ fees in
        arbitration even if permitted under applicable law.
      </p>
      <p className="information-pages__paragraph">
        Class Action Waiver. YOU AND WE EACH AGREE THAT ANY PROCEEDINGS, WHETHER IN ARBITRATION OR
        COURT, WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS, REPRESENTATIVE,
        MASS, OR CONSOLIDATED ACTION. If we believe that any claim you have filed in arbitration or
        in court is inconsistent with this limitation, then you agree that we may seek an order from
        a court determining whether your claim is within the scope of this class action waiver. If a
        court or arbitrator determines in an action between you and us that any part of this Class
        Action Waiver is unenforceable with respect to any claim, the arbitration agreement and
        Class Action Waiver will not apply to that claim, but they will still apply to any and all
        other claims that you or we may assert in that or any other action. If you opt out of the
        arbitration provision as specified above, this Class Action Waiver provision will not apply
        to you. Neither you, nor any other customer, can be a class representative, class member, or
        otherwise participate in a class, consolidated, or representative proceeding without having
        complied with the opt out requirements above.
      </p>
      <p className="information-pages__paragraph">
        Jury Trial Waiver. If a claim proceeds in court rather than through arbitration, YOU AND WE
        EACH WAIVE ANY RIGHT TO A JURY TRIAL.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHAT IS A RATE PLAN?</h3>
        Your “Rate Plan” includes your Service allotments, for example, for minutes, messages or
        data, rates and other terms. Go Talk may introduce access to new technologies, features, or
        services that you can add for an additional charge. If any term in your Rate Plan conflicts
        with these T&Cs, the term in your Rate Plan governs.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">HOW WILL I BE CHARGED FOR DATA USAGE?</h3>
        Data service may be included in your Rate Plan or data pass or you may be charged for data
        usage on a pay per use basis (“Data Plan”). Your Rate Plan and/or Data Plan will contain
        more information about how we calculate data usage. You can check your current usage by
        visiting my.Gotalkwireless.com or by using a short code from your device (you can find more
        information about the short code at
        <a className="link-support" href={routes.home}>
          {' '}
          www.gotalkwireless.com
          {' '}
        </a>
        customers can check current usage by logging into your account at .com, or by using the My
        app. If you do not have a Data Plan, your Device may not be able to access data services.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHAT IS THE RETURN/REFUND POLICY?</h3>
        Please refer to the ‘Return’ policy on
        <a className="link-support" href={routes.returnPolicy}>
          {' '}
          www.gotalkwireless/returnPolicy.com
          {' '}
        </a>
        for the details surrounding cancelling your service following activation.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHAT IS THE CANCELATION PROCESS?</h3>
        If you wish to cancel your service, you may do so at any time. You will not incur further
        monthly charges after the current month of service. The current months charge will not be
        refunded. Your service will remain in place until the end of the current month, unless you
        ask us to de-activate your service or unless we consider your use warrants de-activatation
        due to violation of our terms and conditions. You may Port your number out of Go Talk at any
        time to a different wireless carrier. Please contact customer care to administer the Port.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          HOW DO I GIVE OTHER PEOPLE ACCESS TO MY ACCOUNT?
        </h3>
        f you want someone else to be able to access and manage your account, you can establish them
        as an “Authorized User,” so they can:
        <br />
        Make changes to your account;Add or remove services or features to your account;Receive
        notices and disclosures on your behalf;Purchase Devices for use with our Service, including
        under an installment plan; andIncur Charges on your account.The easiest way to designate an
        Authorized User is online through your my Gotalkwireless.com account. Keep in mind that you
        should not share your account validation information. An Authorized User will need to verify
        identity before we provide access to account information. This information is sensitive so
        take steps to protect it. We will treat presentation of the proper account validation
        information as authorized access to an account.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHERE, HOW, AND WHEN DOES MY SERVICE WORK?</h3>
        These T&Cs describe the experience you can expect on our networks, including information
        about our reasonable network management practices, and the experience on our roaming
        partners’ networks. Please check our coverage maps, which approximate our anticipated
        coverage area outdoors. Your experience on our networks may vary and change without notice
        depending on a variety of factors. You agree that we are not liable for problems relating to
        Service availability or quality. To provide the best possible experience for the most
        possible customers on Go Talk branded rate plans, for many Rate Plans, we prioritize the
        data usage of a small percentage of our heavy data users, below that of other customers.
        This threshold number is specified in your Rate Plan and is also periodically evaluated and
        may change over time. We also prioritize the data of customers who choose certain Rate Plans
        after the data for other Go Talk or branded rate plans, but before customers who are
        prioritized as heavy data users. Customers whose data is prioritized lower may notice speeds
        lower than customers with higher priority in times and locations where there are competing
        customer demands for network resources. See your selected service or visit our Open Internet
        page at the link below for details. We prioritize smartphone and mobile internet (tablet)
        over Smartphone Mobile HotSpot (tethering) traffic on our network. We utilize streaming
        video optimization technology in our networks to help minimize data consumption while also
        improving the service experience for all customers. For example, a small number of Rate
        Plans experience video optimization via the Binge On feature. Some qualifying video
        providers may choose to opt-out of the Binge On program. The Binge On optimization
        technology is not applied to the video services of these providers, and high-speed data
        consumption will continue as if Binge On were not enabled. Additionally, we may implement
        other network practices, to ensure optimized network performance as technologies evolve. For
        example, some plans may offer gaming or audio streaming at standard or at high definition.
        Our Open Internet Policy, located at
        <a className="link-support" href=" www.Gotalkwireless.com/OpenInternet">
          {' '}
          www.Gotalkwireless.com/OpenInternet
          {' '}
        </a>
        , includes important information on these topics as well as information on commercial terms
        and performance characteristics (such as expected speed, latency and network practices.)
      </p>
      <p className="information-pages__paragraph">
        Using Our NetworksWILL MY SERVICE VARY? WHAT FACTORS MAY AFFECT MY SERVICE?As our customer,
        your actual Service area, network availability, coverage and quality may vary based on a
        number of factors, including your selected service, network capacity, terrain, weather, if
        you are on a private or public Wi-Fi network, using a non-Go Talk device, or if your Device
        no longer supports network technologies compatible with or available on Go Talk’s network.
        Outages and interruptions in Service may occur, and speed of Service varies. Devices also
        have varying speed capabilities and may connect to different networks depending on
        technology. Even within coverage areas and with broadband-capable devices, network changes,
        traffic volume, outages, technical limitations, signal strength, obstructions, weather,
        public safety needs, and other conditions may impact speeds and service availability.We
        engineer our network to provide consistent high-speed data service, but at times and at
        locations where the number of customers using the network exceeds available network
        resources, customers will experience reduced data speeds. In those cases, customers who
        choose certain rate plans may notice speeds lower than customers on other Go Talk or branded
        rate plans, which are prioritized higher on our networks. Further, to provide the best
        possible on-device experience for the most possible customers on Go Talk or branded plans
        and minimize capacity issues and degradation in network performance, we may, without advance
        notice, take any actions necessary to manage our network on a content-agnostic basis,
        including prioritizing all on-device data over Smartphone Mobile HotSpot (tethering) data
        and, for the vast majority of Rate Plans, further prioritizing the data usage of a small
        percentage of heavy data users (as defined in their Rate Plans), below that of all other
        customers in times and locations where there are competing customer demands for network
        resources, for the remainder of the billing cycle. This threshold number is periodically
        evaluated and may change over time.
      </p>
      <p className="information-pages__paragraph">
        Where the network is lightly loaded in relation to available capacity, a customer whose data
        is prioritized below other data traffic will notice little, if any, effect from having lower
        priority. This will be the case in the vast majority of times and locations. At times and
        locations where the network is heavily loaded in relation to available capacity, however,
        these customers will likely see significant reductions in data speeds, especially if they
        are engaged in data-intensive activities. Customers should be aware that these practices may
        occasionally result in speeds below those typically experienced on our 5G or LTE networks.
        We constantly work to improve network performance and capacity, but there are physical and
        technical limits on how much capacity is available, and in constrained locations the
        frequency of heavy loading in relation to available capacity may be greater than in other
        locations. When network loading goes down or the customer moves to a location that is less
        heavily loaded in relation to available capacity, the customer’s speeds will likely improve.
        Visit
        <a className="link-support" href={routes.home}>
          {' '}
          www.Gotalkwireless.com
          {' '}
        </a>
        for details and for current data amount subject to this practice.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*CAN I ROAM ON MY DEVICE?</h3>
        Domestic Roaming. Your Device may connect to another provider’s network (“Off-Net”). This
        may happen even when you are within the Go Talk coverage area. Check your Device to
        determine if you are Off-Net. Please do not abuse this; we may limit or terminate your
        Service if you do. Your device may also connect to another provider’s secured Wi-Fi network.
        See WHAT ARE THE PERMITTED AND PROHIBITED USES FOR MY DEVICE AND THE SERVICE? section for
        additional info.
      </p>
      <p className="information-pages__paragraph">
        International Roaming & Dialing. Availability and features offered for international roaming
        and dialing vary depending on your Rate Plan and Device. All countries may not be available
        for roaming, and available countries may change from time to time;
        <a className="link-support" href={routes.home}>
          {' '}
          visit
          {' '}
        </a>
        for more information about which countries are currently available for roaming. Whether
        roaming internationally or making and sending international calls and messages while in the
        U.S. (or Puerto Rico), you may be charged international rates (including for voicemails left
        for you and for data usage). This includes per-minute rates for calls, and per-minute rates
        for calls transferred to your voicemail, and the relevant data rates for data usage. You may
        be charged for more than one call for unanswered calls that are forwarded to voicemail
        regardless of whether the calls result in actual voicemail messages being left for you and
        regardless of whether your Device is on or off. Different rates and rounding increments
        apply in different countries. For information on international access, rates, services, and
        coverage, visit
        <a className="link-support" href={routes.home}>
          {' '}
          http://www.Gotalkwireless.com
        </a>
        While roaming internationally, your data throughput may be reduced, and your Service may be
        otherwise limited or terminated at any time without notice. You are responsible for
        complying with U.S. Export Control laws and regulations, and the import laws and regulations
        of foreign countries when traveling internationally with your Device. The availability of,
        and access to, emergency calling services (e.g., 911 in the U.S.), may vary by country. You
        should familiarize yourself with how to access these services before using your handset for
        international roaming. See WHAT ARE THE PERMITTED AND PROHIBITED USES FOR MY DEVICE AND THE
        SERVICE? section for additional information about international roaming.
      </p>
      <p className="information-pages__paragraph">
        Streaming
        <br />
        VideoWe deploy streaming video optimization technology in our network, which also helps to
        ensure that available network capacity can be utilized to provide a good service experience
        for the maximum number of customers. The optimization technology is intended to manage data
        usage on the network, reduce the risk of streaming video stalling and buffering on mobile
        devices, and reduce the amount of data consumed for streaming video, making room for other
        users to enjoy higher speeds and a better network experience overall. Video optimization
        occurs only to data streams that are identified by our packet-core network as video or where
        the video provider has chosen to establish protocols to self-optimize their video. While
        many changes to streaming video files are likely to be indiscernible, the optimization
        process may impact the appearance of the streaming video as displayed on a user’s Device. In
        some instances, video optimization may also identify and treat downloads of video files as
        if they were real-time video streams. However, the Go Talk network offers content providers
        a way to opt-in to a protocol to help identify video downloads and ensure they are not
        treated as streaming video. Customers may have Rate Plans where video optimization is
        delivered at DVD quality (typically 480p), with the ability to add a feature where video
        streams at speeds that provide HD video capability (typically 1080p). Alternatively,
        customers may have Rate Plans that offer video optimization as a customer-controlled feature
        (e.g., “Binge On”) to toggle on or off DVD-quality video optimization. Some qualifying video
        providers may choose to opt-out of the Binge On program, see listing at
        <a className="link-support" href={routes.home}>
          http://www.Gotalkwireless.com
        </a>
        The Binge On optimization technology is not applied to the video services of these
        providers, and high-speed data consumption will continue as if Binge On were not enabled.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          *HOW WILL I BE BILLED FOR USE OF THE SERVICES?
        </h3>
        You agree to pay all Charges we assess and bill you or that were accepted or processed
        through all Devices on your account. You agree to provide us with accurate and complete
        billing and tax related information and to report all changes within 30 days of the change.
        You will receive an electronic (paperless) bill unless you tell us you want a paper bill.
        You have the option of switching to a paper bill at no cost to you by changing your billing
        preferences at
        <a className="link-support" href={routes.home}>
          {' '}
          www.my.Gotalkwireless.com
          {' '}
        </a>
        or by contacting Customer Care. For more information about paperless billing, please visit
        <a className="link-support" href={routes.home}>
          {' '}
          www.Gotalkwireless.com
        </a>
      </p>
      <p className="information-pages__paragraph">
        Off-Rate Plan Charges. You may have to pay extra for calls to some numbers (e.g. conference
        & chat lines, broadcast, calling card, international, 900 or 976 calls, etc.).Here is more
        information about how we bill for calls, data usage and messaging, Wi-Fi usage, third party
        charges, taxes, and surcharges.Usage. Airtime usage is measured from the time the network
        begins to process a call (before the phone rings or the call is answered) through its
        termination of the call (after you hang up). For voice calls, we round up any fraction of a
        minute to the next full minute. Depending upon your Rate Plan, data usage may be rounded at
        the end of each data session, at the end of your billing cycle, and/or at the time you
        switch data plans. You may be charged for more than one call/message when you use certain
        features resulting in multiple inbound or outbound calls/messages (such as call forwarding,
        call waiting, voicemail, conference calling, and multi-party messaging). You will be charged
        for text, instant or picture messages, and email whether read or unread, sent or received,
        solicited or unsolicited. We use filters to block spam messages, but we do not guarantee
        that you will not receive spam or other unsolicited messages. Additional blocking options
        are available at
        <a className="link-support" href={routes.home}>
          {' '}
          www.my.Gotalkwireless.com
          {' '}
        </a>
        Most usage and Charges incurred during a billing cycle will be included in your bill for
        that cycle. Some usage and Charges may be delayed to a later billing cycle, which may cause
        you to exceed Rate Plan allotments in a later billing cycle. Unused Rate Plan allotments
        expire at the end of your billing cycle. You may be billed additional Charges for certain
        features and services. Charges for Wi-Fi usage may vary; see your Rate Plan for more
        details.
      </p>
      <p className="information-pages__paragraph">
        Taxes. You agree to pay all taxes and fees imposed by governments or governmental entities.
        We may not give advance notice of changes to these charges. To determine taxes & fees, we
        use the street address you identified as your Place of Primary Use (“PPU”), unless the tax
        laws require use of a different address in which case we utilize the best information
        available to us to determine the correct address. The PPU for Puerto Rico customers must be
        in Puerto Rico. If you did not identify the correct PPU, or if you provided an address, such
        as a PO Box, that is not a recognized street address, does not allow us to identify the
        applicable taxing jurisdiction(s), or does not reflect the Service area associated with your
        telephone number, you may be assigned a default location for tax purposes. Except as may be
        otherwise required by law, in the event you dispute your PPU or the location we assigned you
        and the resulting taxes or fees applied on your bill, you must request a refund of the
        disputed tax or fee within 60 days of the date of our bill containing such tax or fee.
        Regardless of any Rate Plan guarantee, taxes and fees may change from time to time without
        notice.
      </p>
      <p className="information-pages__paragraph">
        Surcharges. You agree to pay all surcharges applicable to your Rate Plan. Surcharges are not
        mandated or imposed on you by law, they are Go Talk Charges that are determined, collected,
        and retained by us. The components and component amounts of the Surcharges are subject to
        change without notice. Surcharges include charges, costs, fees, and certain taxes that we
        incur to provide Services (and are not government taxes or fees imposed directly on our
        customers). Examples include general and administrative fees (such as certain costs we incur
        to provide Service), as well as governmental-related assessments (such as Federal or State
        Universal Service fees, regulatory or public safety charges, environmental fees, and gross
        receipts taxes). Surcharges assessed to you will vary depending on the type of Service and
        the Rate Plan you have. Surcharges may change from time to time without notice regardless of
        any Rate Plan guarantee (and subject to our 14-day notice policy if changes to your Service
        or Rate Plan will have a material adverse effect on you). Surcharges will apply whether or
        not you benefit from the programs, activities, or services included in the Surcharge. When
        Surcharges are assessed in connection with your Service, you can find the Surcharges
        detailed in either the “Taxes, Fees & Surcharges”, “Go Talk Fees and Charges” or the “Other
        Charges” sections of your bill or at
        <a className="link-support" href={routes.home}>
          {' '}
          www.myGotalkwireless.com.
          {' '}
        </a>
      </p>
      <p className="information-pages__paragraph">
        Other Fees. We may charge activation, prepayment, reactivation, program, or other fees to
        establish, change, or maintain Services, Certain transactions may also be subject to a
        charge (for example, convenience payment, changing phone numbers, handset upgrades, etc.).
        We will tell you if any of these fees apply to your requested transaction.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">WHAT IF I DON’T PAY ON TIME?</h3>
        We may charge a late fee of up to the highest amount allowed by law. We may also charge a
        returned payment fee at the highest amount permissible by law. We may restrict your payment
        methods to cashier’s check, money order, or other similar secure forms of payment at any
        time for good reason. If you fail to pay on time and we refer your account to a third party
        for collection, a collection fee will be assessed by Go Talk and will be due at the time of
        the referral to the third party. The fee will be calculated as a percentage of the amount
        due to the extent permitted, or not otherwise prohibited, by applicable law. If we accept
        late or partial payments, you still must pay us the full amount you owe, including late
        fees. We will not honor limiting notations you make on or with your checks. Late payment,
        non-payment and/or collection fees are intended to be a reasonable advance estimate of our
        actual costs resulting from late payments and non-payments by our customers; these costs are
        not readily ascertainable and are difficult to predict or calculate at the time that these
        fees are set. You and we each agree that if you fail to timely pay amounts due, we may
        assign your account for collection, and the collection agency may pursue, in small claims
        court, claims limited strictly to the collection of the past due amounts and any interest or
        costs of collection permitted by law or this Agreement. If your account is unpaid or
        otherwise not in good standing, your service may be reduced, suspended, or terminated.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*DOES GO TALK CHECK MY CREDIT?</h3>
        Yes, for many of our products and services. We may get information about your credit history
        from credit-reporting agencies, which may affect your credit rating. We may report
        information about your account to credit bureaus. Late payments, missed payments, or other
        defaults on your account may be reflected in your credit report. We may place a temporary or
        permanent account spending limit (ASL) on your account to limit the amount you can charge,
        regardless of when payment on those charges is due, and we may suspend your Services without
        prior notice if your account balance reached the ASL, even if your account is not past due.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">AM I REQUIRED TO MAKE A DEPOSIT?</h3>
        We may require you to make a deposit or prepayment for Services. We can apply deposits,
        payments, or prepayments in any order to any amounts you owe us on any account. This deposit
        is refundable, and will be applied as a credit to your account along with interest as may be
        required by law.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">CAN GO TALK ACCESS MY DEVICE?</h3>
        We may remotely change software, systems, applications, features or programming on your
        Device without notice. These changes will modify your Device and may affect or erase data
        you have stored on your Device, the way you have programmed your Device, or the way you use
        your Device. You will not be able to use your Device during the installation of the changes,
        even for emergencies.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          CAN I DOWNLOAD AND USE THIRD PARTY CONTENT AND APPS ON MY DEVICE?
        </h3>
        Yes. You are free to download and use content or applications (“Content & Apps”) on your
        Device that are not provided by Go Talk, at your own risk. Third party Content & Apps may
        require your agreement to a license or other terms with the third party. Some Devices or
        Content & Apps may contact our network without your knowledge, which may result in
        additional Charges (e.g., while roaming internationally).
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*LICENSE</h3>
        Your Device’s Software is licensed, not sold, to you by Go Talk and/or other licensors for
        your personal, lawful, non-commercial use on your Device only. You may only use the Software
        as authorized by its license. Your Device’s “Software” includes its software, interfaces,
        documentation, data, and Content & Apps, as each may be updated or replaced by feature
        enhancements or other updates.Except as permitted by applicable law, you may not assign,
        transfer, sublicense, copy, reproduce, redistribute, resell, modify, decompile, attempt to
        derive the source code of, or reverse engineer all or any part of the Software, or alter,
        disable or circumvent any digital rights management security features embedded in the
        Software. The Software may not be transferable from one Device to another Device. You may
        not create derivative works of all or any part of the Software. You agree the Software
        contains proprietary content and information owned by Go Talk, its licensors, and/or other
        third parties. Go Talk, its licensors, and such other third parties reserve the right to
        change, suspend, terminate, remove, impose limits on the use or access to, or disable access
        to, the Software at any time without notice and will have no liability for doing so. You
        agree that your violation of the Software license harms Go Talk, its licensors, and/or other
        third parties, that this harm cannot be fully redressed by money damages, and that Go Talk,
        its licensors, and such other third parties shall be entitled to immediate injunctive relief
        in addition to all other remedies available.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*WHAT IS THE TERM OF THESE T&Cs?</h3>
        As the Un-Carrier, we did away with annual service contracts. You are free to go, although
        we’d be sad to see you leave. You are responsible for all Charges incurred through the end
        of your Service term. If you port your number to another carrier, your Service will be
        deactivated. In addition, cancellation of Service may affect other agreements that you have
        with us, including equipment installment plans or lease agreements where some of your
        payments may be accelerated upon cancellation.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          *CAN GO TALK CHANGE OR TERMINATE MY SERVICES OR THIS AGREEMENT?
        </h3>
        Yes. Except as described below for Rate Plans with the price-lock guarantee (including the
        “Un-Contract Promise”), we may change, limit, suspend or terminate your Service or this
        Agreement at any time, including if you engage in any of the prohibited uses described below
        under “What are the permitted and prohibited uses for my Device and the Service?” or no
        longer reside in a Go Talk-owned network coverage area. Under certain limited circumstances,
        we may also block your device from working on our network. If the change to your Service or
        Rate Plan will have a material adverse effect on you, we will provide 14 days’ notice of the
        change. You’ll agree to any change by using your Service after the effective date of the
        change. We may exclude certain types of calls, messages or sessions (e.g. conference and
        chat lines, broadcast, international, 900 or 976 calls, etc.), in our sole discretion,
        without further notice.If you are on a price-lock guaranteed Rate Plan, we will not increase
        your monthly recurring Service charge (“Recurring Charge”) for the period that applies to
        your Rate Plan, or, if no specific period applies, for as long as you continuously remain a
        customer in good standing on a qualifying Rate Plan. If you switch plans, the price-lock
        guarantee for your new Rate Plan will apply (if there is one). The price-lock guarantee is
        limited to your Recurring Charge and does not include, for example, add-on features, taxes,
        surcharges, fees, or charges for extra features or Devices. If your Service or account is
        limited, suspended or terminated and then reinstated, you may be charged a reactivation fee.
        For information about our unlocking policy,
        <a
          className="link-support"
          href={routes.home}
        >
          {' '}
          visit.
          {' '}
        </a>
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*YOUR CONSENT TO BE CONTACTED</h3>
        We may contact you without charge, on any wireless telephone number assigned to your account
        for any purpose, including marketing, and in any manner permitted by law. You also expressly
        consent to be contacted by Go Talk or our agents for any purpose, including billing and,
        collection, at any mailing address, telephone number, or any other electronic address where
        you may be reached. You agree that Go Talk or our agents may contact you in any manner,
        including pre-recorded artificial voice or an automatic telephone dialing system. You agree
        to notify us promptly if you can no longer be reached at a contact number you provided us.
        You represent that you have received the consent of any Authorized Users and other users on
        your account to be contacted by us as described in this Section. You agree that all consents
        provided in this Section will survive cancellation of your Service and account
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*HOW DO WE NOTIFY EACH OTHER?</h3>
        You may contact us at
        <a className="link-support" href={routes.support}>
          {' '}
          www.Gotalkwireless.com
          {' '}
        </a>
        , by calling 1-949-209-5280 or calling 611 from your Device, or by writing to: Go Talk
        Customer Relations, 28202 Cabot Rd #300, Laguna Niguel CA 92677. Go Talk may deliver notices
        to you by mail, phone, or electronic means using your account information in our records.
        Electronic notices are considered delivered when sent. Mail notices are considered delivered
        3 days after mailing. For multi-line accounts, we may assign a “Primary Telephone Number” to
        your account for the purpose of receiving notices, as well as for other purposes. If you
        would like to change it, contact us.To begin arbitration or any other legal proceeding, you
        must serve our registered agent. Our registered agent can be contacted at 717 N Street NW,
        STE 1, Washington , DC 20036
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">EMERGENCY ALERTS</h3>
        Go Talk participates in the wireless emergency alert program administered by the federal
        government within portions of its network. This allows federal, state, and local government
        agencies to send alerts about local emergencies to Go Talk customers in specifically defined
        geographic areas. Wireless alert capable handsets with appropriate notification settings are
        required for the service There is no additional charge for these wireless emergency alerts.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">911 ACCESS</h3>
        911 ACCESSPLEASE CAREFULLY READ THE INFORMATION BELOW. IT CONTAINS IMPORTANT INFORMATION
        REGARDING LIMITATIONS OF 911 FUNCTIONALITY. YOU ACKNOWLEDGE THESE LIMITATIONS AND AGREE TO
        SHARE THESE LIMITATIONS WITH ANYONE WHO MAY USE YOUR SERVICE TO PLACE CALLS OR SEND TEXTS.
      </p>
      <p className="information-pages__paragraph">
        911 services are provided by your state and local government. Go Talk handsets are capable
        of making calls to 911 in the United States, and 911 access is available to customers
        regardless of your Rate Plan. The handset must have battery power and network connectivity
        to complete a 911 call. Although Go Talk is often capable of communicating your phone number
        and/or current location to a public safety answering point (“911 Communications Center”), in
        some cases, 911 Communications Center operators may not know your phone number or have
        information about your current location. As a result, when making 911 calls, you should
        provide your contact information and current location. Other third-party entities are
        involved in connecting a 911 call and Go Talk is not solely responsible for determining
        which 911 Communications Center your 911 call may be routed to. If you are porting a phone
        number to or from us, we may not be able to provide you with some Services, such as 911
        location services while the port is in process. If you are outside the U.S., you may have to
        dial a different number than 911 to call emergency services.Wi-Fi Calling. Wi-Fi Calling
        services use a broadband internet connection to make calls, including calls to 911. Calls to
        911 using Wi-Fi Calling operate differently than 911 calls made over a cellular network or a
        landline phone. If possible, use a cellular connection or a landline phone to place any 911
        calls. If a cellular connection is available when you a place a 911 call, your handset will
        make the 911 call using the handset’s native dialer over the cellular connection to improve
        call quality and location accuracy even if you have Wi-Fi Calling services enabled.
      </p>
      <p className="information-pages__paragraph">
        When you first enable Wi-Fi Calling on Go Talk, you must provide us with the primary street
        address at which the Wi-Fi Calling service will be used (“Your E911 Registered Address”). If
        you call 911 over Wi-Fi, we may transmit Your E911 Registered Address to the 911
        Communications Center that answers the call, and it may be used to help emergency responders
        locate you. However, because of the limitations associated with Wi-Fi 911 calling, including
        the fact that the broadband internet connection utilized may be supplied by a third-party
        unaffiliated with Go Talk, you should provide the 911 Communications Center with your
        contact information and current location. You agree to update Your E911 Registered Address
        before you use the Wi-Fi Calling service at a location different from Your E911 Registered
        Address.
      </p>
      <p className="information-pages__paragraph">
        Text-to-911. Text-to-911 service may be available in some locations where Go Talk service is
        provided. This is dependent on your local 911 Communication Center’s ability to receive text
        messages.
      </p>
      <p className="information-pages__paragraph">
        TTY Calls to 911. Calls to 911 from a TTY will not work when using Wi-Fi Calling or
        Voice-over-LTE (“VoLTE”). If you cannot make a voice call to 911, Go Talk recommends that
        you use an internet-based Telecommunications Relay Service such as Video Relay Service, IP
        Relay Service, or IP Captioned Telephone Service. Go Talk Real-Time Text (“RTT”) technology
        is also available on Go Talk’s network and can be used on select devices to contact 911.
      </p>
      <p className="information-pages__paragraph">
        VoIP Services
        <br />
        Some Go Talk voice services, including Wi-Fi Calling services, utilize Voice over Internet
        Protocol (“VoIP”) technology. VoIP telephony is fundamentally different from traditional
        telephone service and has inherent limitations. VoIP services, including 911 calling, may be
        unavailable or limited in some circumstances. If possible, use a cellular connection to
        place any 911 calls.911 functionality for Go Talk VoIP services may be impaired or
        unavailable:If you use the VoIP Service in a location other than at Your E911 Registered
        Address;If there is a problem with the broadband network utilized, including network
        congestion, network, equipment, power failure, another technical problem, or during system
        updates or upgrades; andIf you have lost electrical power.Before using any Go Talk VoIP
        service, you must provide us with Your E911 Registered Address. If you call 911 using a Go
        Talk VoIP service, we may transmit Your E911 Registered Address to the 911 Communications
        Center that answers the call, and it may be used to help emergency responders locate you.
        You agree to update Your E911 Registered Address before you use your Go Talk VoIP service at
        a different location. You can update your E911 Registered Address by contacting Go Talk
        Customer Care.In some circumstances when using a Go Talk VoIP service, we may not be able to
        provide 911 Communications Centers with your correct current location. If you make a 911
        call using a Go Talk VoIP service, you should always provide the 911 Communications Center
        your contact information and current location.In some limited circumstances, such as when a
        user makes a call from an area not covered by the 911 network, users may have limited
        access, or no access, to either basic 911 or E911. If the user does not have access to
        either basic 911 or E911, calls to 911 using Go Talk VoIP services will be sent to a
        national emergency call center. A trained agent at the national emergency call center should
        ask for the name, telephone number and location of the user calling 911, and then contact
        the local 911 Communications Center to request help for the user.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">PARENTAL CONTROLS</h3>
        We offer services that help you to monitor and filter, or restrict, internet access to
        minors. Contact Go Talk Customer Care for more information.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          *WHAT ARE THE PERMITTED AND PROHIBITED USES FOR MY DEVICE AND THE SERVICES?
        </h3>
        Our wireless network is a shared resource, which we manage for the benefit of all of our
        customers. Your Data Plan is intended for Web browsing, messaging, and similar activities.
        Certain activities and uses of our Services and your Device are permitted and others are
        not. If you buy, lease, or finance a Device manufactured for use on our network, you agree,
        and we rely on your agreement, that you intend it to be activated on our Service and will
        not resell or modify the Device, or assist anyone doing so. Here are examples of permitted
        and prohibited uses. Permitted uses include:
        <ul className="list-information">
          <li>Voice calls</li>
          <li>Web browsing</li>
          <li>Messaging</li>
          <li>Email</li>
          <li>Streaming music</li>
          <li>
            Uploading and downloading applications and content to and from the Internet or third
            party stores
          </li>
          <li>
            Using applications and content without excessively contributing to network congestion
            and
          </li>
          <li>
            Tethering your Device to other non-harmful devices pursuant to the terms and conditions
            and allotments of your Data Plan.
          </li>
        </ul>
        Unless explicitly permitted by your Rate Plan or Data Plan, you are not permitted to use
        your Device or the Services in a way that we determine:
      </p>
      <p className="information-pages__paragraph">
        Uses a repeater or signal booster other than one we provide to you;Compromises network
        security or capacity, degrades network performance, uses malicious software or “malware”,
        hinders other customers’ access to the network, or otherwise adversely impacts network
        service levels or legitimate data flows;Uses applications which automatically consume
        unreasonable amounts of available network capacity;Uses applications which are designed for
        unattended use, automatic data feeds, automated machine-to-machine connections, or
        applications that are used in a way that degrades network capacity or functionality;Misuses
        the Service, including "spamming" or sending abusive, unsolicited, or other mass automated
        communications;Accesses the accounts of others without authority;Results in more than 50% of
        your voice and/or data usage being Off-Net (i.e., connected to another provider’s network)
        for any 2 billing cycles within any 12-month period;Results in unusually high usage (meeting
        the definition of a heavy data user for your Rate Plan) and the majority of your data usage
        being Smartphone Mobile HotSpot (tethering) usage for any 3 billing cycles within any
        6-month period;Uses a fixed wireless device (provided for use in a fixed location) at a
        location or address other than the one provided at activation;Resells the Service, either
        alone or as part of any other good or service; Tampers with, reprograms, alters, or
        otherwise modifies your Device to circumvent any of our policies or violate anyone’s
        intellectual property rights;Causes harm or adversely affects us, the network, our
        customers, employees, business, or any other person;Conflicts with applicable law;Is not in
        accordance with these T&Cs; orAttempts or assists or facilitates anyone else in any of the
        above activities.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          *WHAT HAPPENS IF MY DEVICE IS LOST OR STOLEN?
        </h3>
        Call us immediately if your Device is lost or stolen because you may be responsible for
        additional usage charges incurred in excess of your Rate Plan Charges, applicable taxes,
        fees, and surcharges before you notify us. If Charges are incurred before you notify us, you
        are not liable for Charges you did not authorize, however, the fact that your Device or
        account was used is some evidence of authorization. You agree to cooperate with us and
        provide information if we investigate the Charges you believe were unauthorized. If we
        determine the Charges were unauthorized, we will credit your account. If we determine the
        Charges were authorized, we will inform you within 30 days, and you will remain responsible
        for the Charges. If you request that we not suspend your Service, you will remain
        responsible for all Charges incurred. We may prevent a lost or stolen Device from
        registering on our and other networks.To learn about additional anti-theft measures that may
        apply to you,
        <a
          className="link-support"
          href={routes.support}
        >
          {' '}
          visit
          {' '}
        </a>
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">
          ARE THERE SEPARATE TERMS FOR PREPAID CUSTOMERS?
        </h3>
        The terms of these T&Cs apply to prepaid customers. Your Go Talk prepaid Service account
        balance, if sufficient, or your active prepaid plan, gives you access to our prepaid Service
        for a limited amount of time; you must use your prepaid Service during the designated period
        of availability. To use our prepaid Service you must have a Go Talk prepaid Service account
        balance for pay as you go service or be on an active prepaid plan. Service automatically
        activates 90 days after purchasing service unless you activate earlier. Service will be
        suspended when your account balance reaches zero and/or you are at the end of the time
        period associated with your prepaid plan. Monthly plan features are available for one
        calendar month; we will notify you if the dates of your monthly service cycle and other
        dates related to your account change. Your monthly plan will automatically renew at the end
        of your monthly service cycle if you have a sufficient Go Talk prepaid Service account
        balance to cover your prepaid Service plan before the first day after your Service cycle. If
        you do not have a sufficient Go Talk prepaid Service account balance, your prepaid Service
        will be suspended unless you move to a pay as you go plan. If you do not reinstate prepaid
        Service within the required period based upon your service plan, your phone number will be
        reallocated. The Charges for Service and the amount of time that Service is available
        following activation of your prepaid Service account balance may vary; see your Rate Plan
        for more information. Prepaid Service is non-refundable (even if returned during the
        Cancellation Period), and no refunds or other compensation will be given for unused airtime
        balances, lost or stolen prepaid cards, or coupons. You will not have access to detailed
        usage records or receive monthly bills. Coverage specific to our prepaid Service may be
        found at
        <a href={routes.home} className="link-support">
          {' '}
          https:// Gotalkwireless.com
        </a>
      </p>
      <p className="information-pages__paragraph">Other Terms Regarding Dispute Resolution</p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*HOW CAN I DISPUTE MY CHARGES?</h3>
        If you have any questions about your bill or want to dispute any Charges, please contact us
        by visiting
        <a className="link-support" href={routes.support}>
          {' '}
          www.Gotalkwireless.com
          {' '}
        </a>
        , by calling 949-209-5280 or 611 from your Device, or by writing to Go Talk Customer
        Relations, Go Talk LLC 28202 Cabot Rd #300, Laguna Niguel CA 92677. If this does not fix
        things, please notify us in writing. Unless otherwise provided by law, you must notify us in
        writing of any dispute regarding your bill or Charges to your account within 60 days after
        the date you first receive the disputed bill or Charge. If you don’t, you may not pursue a
        claim in arbitration or in court. If you accept a credit, refund, or other compensation or
        benefit to resolve a disputed bill or Charge, you agree that the issue is fully and finally
        resolved, and Go Talk shall be released from any and all liability regarding said dispute.
        Unless otherwise provided by law, you must pay disputed Charges until the dispute is
        resolved.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*CHOICE OF LAW</h3>
        This Agreement is governed by the Federal Arbitration Act, applicable federal law, and the
        laws of the state or jurisdiction in which your billing address in our records is located,
        without regard to the conflicts of laws rules of that state or jurisdiction. Foreign laws do
        not apply. Arbitration or court proceedings must be in the county and state or jurisdiction
        in which your billing address in our records is located, but not outside the U.S.; or Puerto
        Rico.*Disclaimer Of Warranties. Except for any written warranty that may be provided with a
        Go Talk Device you purchase from us, and to the extent permitted by law, the Services and
        Devices are provided on an “as is” and “with all faults” basis and without warranties of any
        kind. We make no representations or warranties, express or implied, including any implied
        warranty of merchantability or fitness for a particular purpose, including security or
        authentication purposes, concerning your Service or your Device. While Go Talk strives to
        protect customer accounts, Go Talk does not guarantee security. You accept responsibility if
        you use your Service as a means of security or authentication for other accounts. For more
        information, please review our Privacy Notice at
        <a className="link-support" href={routes.privacy}>
          {' '}
          https://www.Gotalkwireless.com/privacy
        </a>
        We can’t and don’t promise uninterrupted or error-free Service and don’t authorize anyone to
        make any warranties on our behalf. This doesn’t deprive you of any warranty rights you may
        have against anyone else. We do not guarantee that your communications will be private or
        secure; it is illegal for unauthorized people to intercept your communications, but such
        interceptions can occur.Services or Software provided by third parties (including voice
        applications), 911 or E911, text to 911, or other calling or messaging functionality, may
        work differently than services offered by us, or may not work at all. Please review all
        terms and conditions of such third-party products. When using these products, we are not
        responsible for the availability or reliability of 911 calls or text to 911 messages, or if
        inaccurate location information is provided to the 911 Communications Center. We cannot
        assure you that if you place a 911 call or text you will be found.We are not responsible for
        any download, installation, use, transmission failure, interruption, or delay related to
        Content & Apps, or any third party content, services, advertisements, or websites you may be
        able to access by using your Device or the Services, even if charges for Content & Apps
        appear on your Go Talk bill. You are responsible for maintaining virus and other Internet
        security protections when accessing third party Content & Apps or other services.*Limitation
        of Liability. To the extent permitted by law, you and we each agree to limit claims for
        damages, or other monetary relief against each other to direct and actual damages regardless
        of the theory of liability. This means that neither of us will seek any indirect, special,
        consequential, treble, or punitive damages from the other. These disallowed damages include,
        but are not limited to, damages arising out of unauthorized access or changes to your
        Account, Service, or Device, or the use of your Account, Service, or Device by you or by
        others to authenticate, access, use or make changes to third party accounts, including
        financial, cryptocurrency, or social media accounts. This limitation and waiver also applies
        to any claims you may bring against any other party to the extent that we would be required
        to indemnify that party for such claim. You agree we are not liable for problems caused by
        you or a third party, by any act of nature, or by any criminal activity by someone unrelated
        to Go Talk. You also agree we aren't liable for missed or deleted voicemails or other
        messages, for any information (like pictures) that gets lost or deleted if we work on your
        Device, or for failure or delay in connecting a call or text to 911 or any other emergency
        service. To the extent permitted by law, you and we each also agree that all claims must be
        brought within 2 years of the date the claim arises.
      </p>
      <p className="information-pages__paragraph">
        *Indemnification. You agree to defend, indemnify, and hold us and our directors, officers,
        and employees harmless from any claims arising out of use of the Services or Devices, breach
        of the Agreement, or violation of any laws or regulations or the rights of any third party
        by you, any person on your account, or any person you allow to use the Services or your
        Device
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">*WHAT ELSE DO I NEED TO KNOW?</h3>
        Here are additional terms that apply to you.If we don't enforce our rights under this
        Agreement in one instance, that doesn't mean we won't or can't enforce those rights in any
        other instance. If any part of the Agreement is held invalid that part may be severed from
        the Agreement.You can't assign or transfer the Agreement or any of your rights or duties
        under it without our written consent. We may assign or transfer all or part of the
        Agreement, or your debts to us, without notice. You understand that the assignment or
        transfer of all or any part of this Agreement or your debt will not change or relieve your
        obligations under this Agreement.The Agreement is the entire agreement between you and us
        regarding the rights you have with respect to your Service, except as provided by law, and
        you cannot rely on any other documents or statements by any sales or service representatives
        or other agents.The original version of the Agreement is in English. To the extent there are
        conflicts between the English version and any other language version, the English version
        will control.It is our policy, in appropriate circumstances and in our sole judgment, to
        limit, suspend or terminate the Service of any subscriber, account holder, or user who is
        deemed to be a repeat infringer of copyrights
      </p>
    </section>
  );
};
export default TermsConditions;
