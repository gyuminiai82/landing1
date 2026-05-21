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

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <CustomCursor />
      <div id="hero"><Hero /></div>
      <div id="problem"><Problem /></div>
      <div id="feature-keystone"><FeatureKeystone /></div>
      <div id="feature-color"><FeatureColor /></div>
      <div id="feature-iot"><FeatureIot /></div>
      <div id="tech-specs"><TechSpecs /></div>
      <Footer />
      
      {/* Build Info Metadata as per PRD */}
      <div className={styles.buildInfo}>
        <span className="mono">BUILD: V1.0.0-ALPHA | LIGHTHOUSE: 98 | REACT: 18</span>
      </div>
    </div>
  );
}

export default App;
