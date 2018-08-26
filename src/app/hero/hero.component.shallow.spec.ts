import { TestBed , ComponentFixture} from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import {NO_ERRORS_SCHEMA } from "@angular/core";
import {By } from "@angular/platform-browser";
import {Input,Directive} from '@angular/core';


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

describe(' HeroComponent (shallow tests)',() =>{
    let fixture :ComponentFixture<HeroComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations : [HeroComponent,
                            RouterLinkDirectiveStub],
           // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero',() => {
        fixture.componentInstance.hero = {id :1 ,name:'SuperDude',strength:3};

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag',() => {
        fixture.componentInstance.hero = {id :1 ,name:'SuperDude',strength:3};
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
        console.log('after 1st expect');
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

    it('should have the correct route for the first hero', () =>{
        fixture.componentInstance.hero = { id:1 , name: 'SpiderDude', strength: 8};
        fixture.detectChanges();

        let routerLink = fixture.debugElement.query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub);

        fixture.debugElement.query(By.css('a')).triggerEventHandler('click',null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});