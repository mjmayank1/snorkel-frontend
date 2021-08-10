import styles from "../BeachPage/BeachPage.module.css";
import Image from "next/image";
import BeachInfo from "../BeachPage/BeachInfo/BeachInfo";
import Rating from "react-rating";
import { EmptyStar, FullStar } from "components/StarRating";
import Link from 'next/link';
import Carousel from 'components/Carousel/Carousel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { toaster } from 'evergreen-ui';

const BackImage = (props) => {
    const onEntryMapClick = () => {
        if (props.beach.entry_map) { return }
        toaster.danger(`Sorry, we don\'t have a map for this location yet!`)
    }

    return (
        <div className={styles.image}>
            <div className={styles.imageinner} style={{ backgroundImage: `url(\'${props.beach.hero_img}\')` }}>
                <div className={styles.overlay} />
                <div className={styles.pageHeroInfo}>
                    <div className={styles.nameContainer}>
                        <h1 className={styles.pagetitle}>{props.beach.name}</h1>
                        <Link href="/register">
                            <a className={styles.favorite} alt="Mark as favorite">
                                <FavoriteBorder/>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.stars}>
                        <Rating
                            fractions={2}
                            emptySymbol={(<EmptyStar/>)}
                            fullSymbol={(<FullStar/>)}
                            initialRating={props.beach.rating}
                            readonly>
                        </Rating>
                    </div>
                    <div className={styles.beachdescription}>{props.beach.location_city}</div>
                </div>

            </div>
            <div className={styles.menu}>
                <div className={styles.buttoncontainer}>
                    <div className={styles.buttonouter}>
                        <Link href={props.beach.entry_map || props.beach.url}>
                            <a className={styles.buttoncircle} onClick={onEntryMapClick}>
                                <Image src='/mapicon.png' alt="map" objectFit="contain" height='24' width="24"></Image>
                            </a>
                        </Link>
                        <div className={styles.buttonlabel}>Entry Map</div>
                    </div>
                    <div className={styles.buttonouter}>
                        <Link href={props.beach.location_google || ''}>
                            <a className={styles.buttoncircle}>
                                <Image src='/directionsicon.png' alt="directions" objectFit="contain" height='24' width="24"></Image>
                            </a>
                        </Link>
                        <div className={styles.buttonlabel}>Directions</div>
                    </div>
                    <div className={styles.buttonouter}>
                        <div className={styles.buttoncircle}>
                            <Image src='/photosicon.png' alt="photos" objectFit="contain" height='24' width="24"></Image>
                        </div>
                        <div className={styles.buttonlabel}>Photos</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BeachPage = (props) => {
    return (
        <>
            <BackImage beach={props.beach} />
            <BeachInfo {...props.beach} reviews={props.reviews} />
            <div className={styles.carouselSpacer}>
                <div className={styles.carouseltitle}>Other Locations Nearby</div>
                <Carousel data={[...props.nearbyBeaches]}></Carousel>
            </div>
        </>
    )
}

export default BeachPage;