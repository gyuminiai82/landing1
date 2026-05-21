import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Hero from './components/Hero/Hero';
import Problem from './components/Problem/Problem';
import FeatureKeystone from './components/FeatureKeystone/FeatureKeystone';
import FeatureColor from './components/FeatureColor/FeatureColor';
import FeatureIot from './components/FeatureIot/FeatureIot';
import TechSpecs from './components/TechSpecs/TechSpecs';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile();
  const layoutKey = isMobile ? 'mobile' : 'desktop';

  return (
    <div className={styles.appContainer}>
      <Navbar />
      <CustomCursor />
      <div id="hero"><Hero /></div>
      <div id="problem"><Problem key={`problem-${layoutKey}`} /></div>
      <div id="feature-keystone"><FeatureKeystone key={`keystone-${layoutKey}`} /></div>
      <div id="feature-color"><FeatureColor key={`color-${layoutKey}`} /></div>
      <div id="feature-iot"><FeatureIot key={`iot-${layoutKey}`} /></div>
      <div id="tech-specs"><TechSpecs key={`specs-${layoutKey}`} /></div>
      <Footer />
    </div>
  );
}

export default App;
