import './trust-badge.scss';
import UsaToday from '../../../../assets/images/main-page/usa-today.png';
import DigitalJourning from '../../../../assets/images/main-page/digital-journing.png';
import DailyHerald from '../../../../assets/images/main-page/daily-herald.png';
import DailyNews from '../../../../assets/images/main-page/daily-news.png';

export default function TrustBadge() {
    return (
        <div className="trust-badge-container">
            <div id="brandpush-trust-badge">
                <div className="trust-badge-inner">
                    <div>
                        <span className="brandpush-title-hr" />
                        <span className="brandpush-title">AS SEEN ON</span>
                    </div>
                    <div className="brandpush-logo-container">
                        <div className="brandpush-logo-container-item">
                            <div className="brandpush-vertical-center">
                                <img alt="Featured on USA Today" className="brandpush-news-logo" src={UsaToday} />
                                <img alt="Featured on DigitalJournal" className="brandpush-news-logo" src={DigitalJourning} />
                                <img alt="Featured on Daily Herald" className="brandpush-news-logo" style={{maxWidth: 150}} src={DailyHerald}/>
                                <img alt="Featured on the Starkville Daily News" className="brandpush-news-logo" style={{maxWidth: 150}} src={DailyNews}/>
                            </div>
                        </div>
                        <div>
                            <span className="brandpush-footer">AND OVER 400 NEWS SITES</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
