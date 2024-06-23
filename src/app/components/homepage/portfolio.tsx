import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";

function Portfolio(props: TypePropsWrappedComponent) {
  const { containerRef, headlineRef, sideBlockRef, sideContext } = props;
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          Portfolio
        </h4>
        <span className="opacity-0">Portfolio</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <Image src="/images/p.png" alt="" width={300} height={380} />
        </div>
        <div className="section__context" ref={sideContext}></div>
      </div>
    </div>
  );
}

export default withScrollSectionAnimation(Portfolio);
