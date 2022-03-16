import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer-pages.scss';

const AcceptablePolicy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="section-information-pages">
      <h2 className="information-pages__title">Acceptable use policy</h2>
      <p className="information-pages__paragraph">
        Go Talk Plans. Your Go Talk Service is provided by Go Talk, LLC, including its affiliates,
        assigns and agents (“Go Talk,” “we,” “us” or “our”). Go Talk reserves the right to
        periodically review usage levels, including voice and data usage, of Go Talk Service plans
        (“Go Talk Plans”) to ensure that you are not using a Go Talk Plan in a manner that we
        consider, in our sole discretion, to be in violation of this Acceptable Use Policy (“AUP”),
        and if such an abuse or violation is discovered to terminate or adjust the plan as
        appropriate. You agree to use the voice portion of your Go Talk Plan for traditional voice
        calls between two individuals of a duration comparable to that of the average individual
        customer presently utilizing a Go Talk Plan and will not employ methods, devices or
        procedures to take advantage of your Go Talk Plan by using the plan excessively or for means
        not intended by Go Talk. Excessive use of the voice portion of your Go Talk Plan is defined
        by Go Talk as use that materially exceeds the average call volume or duration used by all
        other Go Talk customers that have purchased a Go Talk Plan. You further agree to use the
        data portion of your Go Talk Plan for traditional Web browsing, messaging, and similar
        activities on the Device (as defined in the Go Talk Terms & Conditions), and will not employ
        methods, devices or procedures to take advantage of your Go Talk Plan by using the plan
        excessively or for means not intended by Go Talk, in violation of any of the prohibitions
        above or below. Go Talk may terminate your Service or change your Service plan if, in its
        sole discretion, Go Talk determines that your use of your Go Talk Plan violates any of these
        prohibitions or is otherwise “unreasonable” or results in abuse of the Go Talk Plan.
      </p>
      <p className="information-pages__paragraph">
        We consider your use of one of our Go Talk Plans to be “unreasonable” or “abusive” and
        therefore subject to immediate termination or adjustment if, among other things, you:
        <ul className="list-information">
          <li>re-sell, re-brand, re-supply, re-market or commercially exploit a Go Talk Plan;</li>
          <li>
            set up routing functionality such that only outbound long-distance traffic is sent over
            the Go Talk Plan;
          </li>
          <li>
            engage in any other conduct which is fraudulent or otherwise may result in significant
            network congestion or degradation, or interferes with our operations, reputation or
            ability to provide quality service to our customers, including without limitation
            excessive purchases (and/or attempted purchases of products and/or services relating to
            your Go Talk Plan in any given month;
          </li>
          <li>engage in autodialing;</li>
          <li>engage in continuous, repetitive or extensive call forwarding;</li>
          <li>
            engage in continuous call session connectivity, including the use of a Go Talk Plan for
            continuous mobile to mobile or mobile to landline voice calls;
          </li>
          <li>engage in telemarketing;</li>
          <li>
            use your Go Talk Plan as a substitute or backup for private lines or dedicated data
            connections;
          </li>
          <li>
            use your Go Talk Plan for automated text or picture messaging to another mobile device
            or email address;
          </li>
          <li>upload, download or stream continuous video or audio;</li>
          <li>
            “spam” or engage in other abusive or unsolicited communications, or any other mass,
            automated voice or data communications for commercial or marketing purposes;
          </li>
          <li>
            use your Go Talk Plan in connection with server devices or host computer applications,
            including continuous Web camera posts or broadcasts, automatic data feeds, automated
            machine to machine connections, voice or SMS relay, or peer to peer (P2P) file sharing;
          </li>
          <li>
            use your Go Talk Plan in connection with software or other devices that maintain
            continuously active Internet connections when a computer’s connection would otherwise be
            idle, or “keep alive functions (e.g., using a Go Talk Plan for Web broadcasting,
            operating servers, telemetry devices and/or supervisory control and data acquisition
            devices);
          </li>
          <li>
            use your Go Talk Plan to relay voice calls and text or picture messages not originated
            from your Go Talk device; or
          </li>
          <li>
            engage in any other activity that would be inconsistent with reasonable personal use
            patterns, causes network congestion or jeopardizes the integrity of Go Talk’s supplier’s
            network.
          </li>
        </ul>
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Lawful purposes only.</h3>
        You may use the Go Talk Service for lawful, proper and appropriate purposes. You may not use
        our Service or your Device in any way that is illegal, improper or inappropriate. A
        non-exhaustive list of examples of illegal, improper or inappropriate uses of our Service
        includes:Interfering with our ability to provide Service to you or other customers, or
        avoiding your obligation to pay for the Service within the time frame designated for
        payment.Use of the Service to threaten, abuse, harass, defame, deceive, defraud, interfere
        or invade another’s privacy or engage in any similar behavior.Use of the Service for:
        auto-dialing; continuous, repetitive or extensive call forwarding; telemarketing (including
        charitable or political solicitation or polling); or fax or voicemail broadcasting or
        blasting.Use of the Service to: impersonate another person; send bulk unsolicited messages;
        or use robots, data mining techniques, or other automated devices or programs to catalog,
        download, store, or otherwise reproduce or distribute information from our Service or use
        any automated means to manipulate our Service.Violate any law, rule, or regulation; violate
        any third party’s intellectual property or personal rights; or exceed your permitted access
        to our Service.Use of the Service for transmitting or receiving any communication or
        material of any kind which would constitute a criminal offense, give rise to a civil
        liability, or otherwise violate any applicable local, state, national or international law
        or encourage conduct that would constitute a criminal offense, give rise to a civil
        liability, or otherwise violate any applicable local, state, national or international
        law.Use of the Service to access, or attempt to access without authority, the information,
        accounts or devices of others, or to penetrate, or attempt to penetrate, Go Talk’s or its
        network supplier’s network or systems.Use of the Service to generate or disseminate viruses,
        malware or “denial of service” attacks Right of Termination. In addition to Go Talk’s right
        to terminate Service for non-payment, Go Talk reserves the right to terminate the Service
        immediately and without advance notice if Go Talk, in its sole discretion, believes that you
        have violated any of the above restrictions, leaving you responsible for all charges,
        including without limitation unbilled charges, all of which become immediately due and
        payable.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Monitoring.</h3>
        We may monitor the use of the Go Talk Service for violations of this AUP and the other
        materials that makeup your Agreement with us. We may, without liability, remove or block all
        communications if we suspect a violation of this AUP or any other materials that makeup your
        Agreement with us, or if we think it necessary in order to protect our Service, Go Talk or
        its network supplier, and/or their respective parents, affiliates, directors, officers,
        agents, and employees from harm.Providing information to authorities and third parties. If
        we believe that you have used the Go Talk Service for an unlawful purpose, we may forward
        the relevant communication and other information, including your identity, to the
        appropriate authorities for investigation and prosecution. You consent to our forwarding of
        any such communications and information to these authorities. In addition, we may disclose
        your name, telephone number, credit card information, and other personal information, any
        communications sent or received by you, and any other information that we may have about
        your account, including but not limited to, types of service, length of service, MAC
        address(es), IP address(es), email address(es), registered 911 address, and all other
        account information, as follows: in response to law enforcement or other governmental agency
        requests; as required by law, regulation, rule, subpoena, search warrant, or court order; as
        necessary to identify, contact, or bring legal action against someone who may be misusing
        the Service; to protect Go Talk’s rights and property; or in emergency situations where
        disclosure of such information is necessary to protect Go Talk customers or third parties
        from imminent harm.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">No Transfer of Service.</h3>
        No Transfer of Service. You may not resell or transfer your Service or provide a telephone
        service to anyone else by using your Go Talk Service or features of your Go Talk Service
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">No Alterations or Tampering.</h3>
        If you copy or alter or have someone else copy or alter the firmware or software in any way
        that facilitates a compromise of your Service, you are responsible for any charges that
        result. You may not attempt to hack or otherwise disrupt our Service or make any use of our
        Service that is inconsistent with its intended purpose.
      </p>
      <p className="information-pages__paragraph">
        <h3 className="information-pages__sub-title">Theft of Service.</h3>
        You may not use or obtain our Service in any manner that avoids Go Talk policies and
        procedures. You will notify us immediately in writing if you believe that your Service is
        being stolen, fraudulently used, or otherwise being used in an unauthorized manner. When you
        notify us of one of these events, you must provide your account number and a detailed
        description of the circumstances of the theft, fraudulent use, or unauthorized use of
        Service. If you fail to notify us in writing in a timely manner, we may disconnect your
        Service and levy additional charges on you. Until you notify us in writing, you will remain
        liable for all use of our Service stolen from you and any and all stolen, fraudulent or
        unauthorized use of the Service up through the date notice is received by Go Talk
      </p>
    </section>
  );
};
export default AcceptablePolicy;
