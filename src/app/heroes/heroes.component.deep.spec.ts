import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { Hero } from "../hero";
import { HeroService} from '../hero.service';
import {NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from 'rxjs/observable/of';
import { Component, Input ,Directive} from '@angular/core';
import {By } from "@angular/platform-browser";

@Directive({
    selector: '[routerLink]',
    host: {'(click)' : 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink')
    linkParams:any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe(' HeroesComponent deep tests',() =>{
    let fixture :ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id:1 , name: 'SpiderDude', strength: 8},
            { id:2 , name: 'Wonderful Woman', strength: 24},
            { id:3 , name: 'SuperDude', strength: 55},
            { id:4 , name: 'SuperDude1', strength: 65}
        ] ;
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        TestBed.configureTestingModule({
            declarations : [HeroesComponent,
                            HeroComponent,
                            RouterLinkDirectiveStub],
            providers:[
                {provide: HeroService, useValue: mockHeroService}
            ],
          //  schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as a HeroComponent', () =>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnit
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDes.length).toBe(4);
        for(let i=0;i < heroComponentDes.length; i++)
        {
            expect(heroComponentDes[i].componentInstance.hero).toEqual(HEROES[i])
        }
    });

    it('should add hero as a HeroComponent', () =>{
        let name = 'Prasad';
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        mockHeroService.addHero.and.returnValue(of({id:5,name: name,strength: 6}));
        // run ngOnit
        fixture.detectChanges();
        fixture.componentInstance.add(name);
        fixture.detectChanges();
        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDes[heroComponentDes.length - 1].componentInstance.hero.name).toEqual(name);
    });

    it('should call hero service . deleteHero with a hero component when delete button is clicked', () =>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
 
        // run ngOnit
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentDes[0].queryAll(By.css('button'))[0].triggerEventHandler('click', {stopPropagation:() => {} });
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should call hero service .(way2) deleteHero with a hero component when delete button is clicked', () =>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
 
        // run ngOnit
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponentDes[0].componentInstance).delete.emit(undefined);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should call hero service .(way3) deleteHero with a hero component when delete button is clicked', () =>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
 
        // run ngOnit
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentDes[0].triggerEventHandler('delete',null);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add new hero to heroes list when add button is clicked', () =>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name="Prasad";
        mockHeroService.addHero.and.returnValue(of({id:5, name:name, strength:6}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const buttonElement = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        buttonElement.triggerEventHandler('click',null);
        fixture.detectChanges();
        
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () =>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponentDes[0].query(By.directive(RouterLinkDirectiveStub))
                    .injector.get(RouterLinkDirectiveStub);

        heroComponentDes[0].query(By.css('a')).triggerEventHandler('click',null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});