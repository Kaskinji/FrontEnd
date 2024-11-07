import { SlideType } from "../entities/Presentation";

type WorkspaceProps = {
  slide: SlideType;
};

function Workspace({ slide }: WorkspaceProps) {
  return <Slide />;
}

export { Workspace };
