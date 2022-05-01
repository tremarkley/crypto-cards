import { StyleSheet, css } from "aphrodite";

interface LogoProps {
  src: string;
  name: string;
}

export const Logo = ({ name, src }: LogoProps) => {
  return <img src={src} alt={`${name} logo`} className={css(styles.wrapper)} />;
};

const styles = StyleSheet.create({
  wrapper: {
    width: 30,
    height: 30,
  },
});
