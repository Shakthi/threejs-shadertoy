import * as THREE from 'three';

import vert from './shaders/shader.vert';
import frag from './shaders/shader.frag';

import commentRegex from 'comment-regex';


export default class ShaderToyMaterial extends THREE.RawShaderMaterial {

    constructor(shaderToySample, options_) {

        var options = options_ || {};
        options.aspectRatio = options.aspectRatio || 1500 / 750;
        let width = 1500;
        let hieght = width / options.aspectRatio;
        options.width = width;
        options.hieght = hieght;


        let usedUniforms = ShaderToyMaterial.retriveUsedUniforms(shaderToySample);

        var clock = new THREE.Clock();
        super({
            vertexShader: vert,
            fragmentShader: "",
        });
        if (usedUniforms.iTime|| usedUniforms.iTimeDelta || usedUniforms.iFrame) {
            if (usedUniforms.iTime|| usedUniforms.iTimeDelta)
                this.clock = clock;
            this.registerUpdate();
        }

        
        
        


        let data = this.createUniformsObject(usedUniforms, options);

        this.uniforms = data.prof;
        var finalfrag = frag + "\n" + data.code + "\n" + shaderToySample;

        this.fragmentShader = finalfrag;


    }

    registerUpdate() {
        setTimeout(() => this.update(),0);

    }

    update() {
        if (this.uniforms.iTime) {
            this.uniforms.iTime.value = this.clock.getElapsedTime();    
        }
        if (this.uniforms.iTimeDelta) {
            this.uniforms.iTimeDelta.value = this.clock.getDelta();    
        }
        if (this.uniforms.iFrame) {
            this.uniforms.iFrame.value = this.uniforms.iFrame.value + 1;    
        }

        requestAnimationFrame(() => { this.update() });
    }


    //Returns uniforms need
    static retriveUsedUniforms(shaderToySample) {
        /*
        uniform vec3 iResolution; // viewport resolution (in pixels)
        uniform float iTime; // shader playback time (in seconds)
        uniform float iTimeDelta; // render time (in seconds)
        uniform int iFrame; // shader playback frame
        uniform float iChannelTime[4]; // channel playback time (in seconds)
        uniform vec3 iChannelResolution[4]; // channel resolution (in pixels)
        uniform vec4 iMouse; // mouse pixel coords. xy: current (if MLB down), zw: click
        uniform samplerXX iChannel0..3; // input channel. XX = 2D/Cube
        uniform vec4 iDate; // (year, month, day, time in seconds)
        uniform float iSampleRate; // sound sample rate (i.e., 44100)
        
        */
        let commentLessShader = shaderToySample.replace(commentRegex(), "");
        let expectedUniforms = "iTime,iTimeDelta,iResolution,iFrame,iChannelTime[4],iChannelResolution[4],iChannel0,iChannel1,iChannel2,iChannel3,iDate".split(",");
        let existingUniforms = {};
        expectedUniforms.forEach(uniform => {
            if (commentLessShader.includes(uniform))
                existingUniforms[uniform] = true;
        });

        return existingUniforms;
    }


    createUniformsObject(usedUnforms, options) {
        let uniforms = {};
        let uniformsCode = ""

        if (usedUnforms.iResolution) {
            uniforms.iResolution = { value: new THREE.Vector2(options.width, options.hieght) }
        }

        if (usedUnforms.iTime) {
            uniforms.iTime = { type: "1f", value: this.clock.getElapsedTime() };
            uniformsCode += "uniform float iTime;\n";
        }


        

        if (usedUnforms.iTimeDelta) {
            uniforms.iTimeDelta = { type: "1f", value: this.clock.getDelta() }
            uniformsCode += "uniform float iTimeDelta;\n";
        }


        if (usedUnforms.iFrame) {
            uniforms.iFrame = { type: "1i", value: 0 }
            uniformsCode += "uniform int iFrame;\n";

        }

        





        return { prof: uniforms, code: uniformsCode };
    }


}