import withScrollSectionAnimation, {
  TypePropsWrappedComponent,
} from "@/utils/hocs/withScrollSectionAnimation";
import Image from "next/image";
import Link from "next/link";

function Services(props: TypePropsWrappedComponent) {
  const { containerRef, headlineRef, sideBlockRef, sideContext } = props;
  return (
    <div className="container mx-auto container-section" ref={containerRef}>
      <div className="headline-section relative">
        <h4 className="absolute top-0 left-0" ref={headlineRef}>
          Services
        </h4>
        <span className="opacity-0">Services</span>
      </div>
      <div className="section__container">
        <div className="section__side" ref={sideBlockRef}>
          <Image src="/images/s.png" alt="" width={300} height={380} />
        </div>
        <div className="section__context" ref={sideContext}></div>
      </div>
    </div>
  );
}

export default withScrollSectionAnimation(Services);
