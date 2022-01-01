type mode = 'dark' | 'light';

export abstract class LightDarkMode{
    static currentMode: mode;

    static changeMode(){
        if(this.currentMode == 'light'){
            this.currentMode = 'dark';
        }else{
            this.currentMode = 'light';
        }
    }
}
