import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from '@/components/Hello';
import index from '../components/index.vue';
import PageNotFound from '@/components/404.vue';

//Inovasi Dashboard2
import adminDashboard from '@/components/dashboard/admin/admin';
import personnelDash from '@/components/dashboard/personnel/admin';
import personnelDashboard from '@/components/dashboard/personnel/dashboard';
import talentDash from '@/components/dashboard/talent/admin';
import talentDashboard from '@/components/dashboard/talent/dashboard';
import talentProfile from '@/components/inovasi/talent/profile/profile';

//INOVASI
import SignUp from '@/components/inovasi/guest/signup/signup'
import Activation from '@/components/inovasi/guest/signup/activation'
import ResendActivation from '@/components/inovasi/guest/signup/resend-activation'
import ResetPassword from '@/components/inovasi/guest/signup/reset/reset'
import ChangePassword from '@/components/inovasi/guest/signup/reset/changePassword'
import SignUpTest from '@/components/inovasi/guest/signup/test'
import DiloSignUp from '@/components/inovasi/guest/dilosignup/signup'
import LoginAdministrator from '@/components/inovasi/guest/admin/login'
import LoginPersonnel from '@/components/inovasi/guest/personnel/login'
import LoginTalent from '@/components/inovasi/guest/talent/login'
import CreateTeam from '@/components/inovasi/talent/team/create'
import TeamMembership from '@/components/inovasi/talent/team/membership/membership'
import TeamMembershipDetail from '@/components/inovasi/talent/team/membership/detail'
import TeamManage from '@/components/inovasi/team/admin/membership'
import TalentBrowse from '@/components/inovasi/team/admin/browse/browse'
import TalentProfileDetail from '@/components/inovasi/team/admin/browse/profile'

import ManageAdmin from '@/components/inovasi/admin/administrator/showall'
import ManagePersonnel from '@/components/inovasi/admin/personnel/showall'
import ManageRegion from '@/components/inovasi/admin/region/showall'
import ManageTrack from '@/components/inovasi/admin/track/showall'
import ManageProgrammeCurriculum from '@/components/inovasi/admin/programmecurriculum/showall'
import ManagePersonaAspect from '@/components/inovasi/admin/persona/showall'
import ManageFormTemplate from '@/components/inovasi/admin/formtemplate/showall'
import ManageField from '@/components/inovasi/admin/formtemplate/field/showall'
import ManageProgramme from '@/components/inovasi/admin/programme/showall'
import ManageTrackAssigment from '@/components/inovasi/admin/programme/trackassignment/showall'
import ManagePhase from '@/components/inovasi/admin/programme/phase/showall'
import ManagePhaseMentoring from '@/components/inovasi/admin/programme/phase/mentoring/showall'
import ManagePhaseScoreRecap from '@/components/inovasi/admin/programme/phase/scorerecap/showall'
import ManagePhaseScoring from '@/components/inovasi/admin/programme/phase/scoring/showall'
import ManagePhaseWorkshop from '@/components/inovasi/admin/programme/phase/workshop/showall'
import NewWorkshop from '@/components/inovasi/admin/programme/phase/workshop/newWorkshop'
import EditWorkshop from '@/components/inovasi/admin/programme/phase/workshop/editWorkshop'

import TeamProgrammeParticipation from '@/components/inovasi/team/member/programparticipation/showall'
import TeamProgrammeParticipationRegister from '@/components/inovasi/team/member/programparticipation/register'

import TeamProgrammeParticipationMentoringSession from '@/components/inovasi/team/member/programparticipation/mentoring/showall'
import TeamProgrammeParticipationMentoringSessionList from '@/components/inovasi/team/member/programparticipation/mentoring/mentoringlist/mentoringlist'
import TeamProgrammeParticipationMentoringTutorList from '@/components/inovasi/team/member/programparticipation/mentoring/mentoringlist/tutorlist'

import TeamProgrammeParticipationWorkshopSession from '@/components/inovasi/team/member/programparticipation/workshop/workshop'

import TeamIdea from '@/components/inovasi/team/member/idea/showall'
import TeamCustomerSegment from '@/components/inovasi/team/member/idea/customersegment/showall'
import TeamPersona from '@/components/inovasi/team/member/idea/persona/showall'
import TeamEmpathyMap from '@/components/inovasi/team/member/idea/valueproposition/empathymap'
import TeamValueProposition from '@/components/inovasi/team/member/idea/valueproposition/showall'
import TeamCompetitor from '@/components/inovasi/team/member/idea/valueproposition/competitor/showall'
import TeamBusinessStructure from '@/components/inovasi/team/member/idea/valueproposition/businessstructure/showall'
import TeamExperiment from '@/components/inovasi/team/member/idea/valueproposition/experiment/showall'
import TeamExperimentDetail from '@/components/inovasi/team/member/idea/valueproposition/experiment/experimentdetail'

import TalentReservation from '@/components/inovasi/team/member/reservation/reservation'
import TalentReservationPast from '@/components/inovasi/team/member/reservation/past'

import TalentTeamComments from '@/components/inovasi/team/member/comment/comment'


import personnelProfile from '@/components/inovasi/personnel/profile/profile'

import CoordinatorProgramme from '@/components/inovasi/personnel/coordinator/programme'
import CoordinatorProgrammeParticipant from '@/components/inovasi/personnel/coordinator/participant/participant'
import CoordinatorProgrammeRegistration from '@/components/inovasi/personnel/coordinator/registration/registration'
import CoordinatorProgrammePhase from '@/components/inovasi/personnel/coordinator/phase/phase'
import CoordinatorProgrammePhaseMentoring from '@/components/inovasi/personnel/coordinator/phase/mentoring/mentoring'
import CoordinatorProgrammePhaseScoring from '@/components/inovasi/personnel/coordinator/phase/scoring/scoring'
import CoordinatorProgrammePhaseWorkshop from '@/components/inovasi/personnel/coordinator/phase/workshop/workshop'
import CoordinatorProgrammePhaseWorkshopReservation from '@/components/inovasi/personnel/coordinator/phase/workshop/reservation/reservation'

import TutorProgramme from '@/components/inovasi/personnel/tutor/programme'
import TutorProgrammePhase from '@/components/inovasi/personnel/tutor/phase/phase'
import TutorProgrammeScoring from '@/components/inovasi/personnel/tutor/scoring/scoring'
import TutorProgrammeScoringParticipant from '@/components/inovasi/personnel/tutor/scoring/participant/participant'
import TutorProgrammeScore from '@/components/inovasi/personnel/tutor/score/score'
import TutorProgrammeMentoring from '@/components/inovasi/personnel/tutor/mentoring/mentoring'
import TutorProgrammeParticipant from '@/components/inovasi/personnel/tutor/participant/participant'
import TutorProgrammeFeedback from '@/components/inovasi/personnel/tutor/comment/comment'

import TutorProgrammeParticipantIdea from '@/components/inovasi/personnel/tutor/participant/idea/showall'
import TutorProgrammeParticipantCS from '@/components/inovasi/team/member/idea/customersegment/showall'
import TutorProgrammeParticipantPersona from '@/components/inovasi/team/member/idea/persona/showall'
import TutorProgrammeParticipantValueProposition from '@/components/inovasi/team/member/idea/valueproposition/showall'
import TutorProgrammeParticipantCompetitor from '@/components/inovasi/team/member/idea/valueproposition/competitor/showall'
import TutorProgrammeParticipantBusinessStructure from '@/components/inovasi/team/member/idea/valueproposition/businessstructure/showall'
import TutorProgrammeParticipantExperiment from '@/components/inovasi/team/member/idea/valueproposition/experiment/showall'
import TutorProgrammeParticipantExperimentDetail from '@/components/inovasi/team/member/idea/valueproposition/experiment/experimentdetail'

import ParticipantTeam from '@/components/inovasi/personnel/team/membership'
import ParticipantTeamProfile from '@/components/inovasi/personnel/team/profile'

import LearningMaterial from '@/components/inovasi/team/learning/index'
import Learning from '@/components/inovasi/team/learning/learning'

import LandingPage from '@/components/landingpage/index'


Vue.use(VueRouter)


const routes = [
    {
      name:'index',
      path: '/login',
      component: LoginTalent
    },
    {
      name:'home',
      path: '/',
      component: LandingPage
    },
    {
      name:'sign up',
      path: '/signup',
      component: SignUp
    },
    {
      name:'Activation',
      props: true,
      path: '/account-activation',
      component: Activation
    },
    {
      name:'Resend Activation',
      props: true,
      path: '/resend-activation',
      component: ResendActivation
    },
    {
      name:'Reset Password',
      props: true,
      path: '/reset-password',
      component: ResetPassword
    },
    {
      name:'Change Password',
      props: true,
      path: '/change-password',
      component: ChangePassword
    },
    {
      name:'DiLo sign up',
      path: '/dilosignup',
      component: DiloSignUp
    },
    {
      name:'login admin',
      path:'/admin',
      component:LoginAdministrator
    },
    {
      name: 'Admin Inovasi',
      path:'/admin-inovasi/dashboard',
      component:adminDashboard,
      children: [
        {
          name: 'manage-admin',
          path: '/admin/manage',
          component: ManageAdmin
        },
        {
          name: 'manage-personnel',
          path: '/personnel/manage',
          component: ManagePersonnel
        },
        {
          name: 'manage-region',
          path: '/region/manage',
          component: ManageRegion
        },
        {
          name: 'manage-track',
          path: '/track/manage',
          component: ManageTrack
        },
        {
          name: 'Manage Program Curriculume',
          path: '/programmecurriculum/manage',
          component: ManageProgrammeCurriculum
        },
        {
          name: 'Manage Persona Aspect',
          path: '/persona/manage',
          component: ManagePersonaAspect
        },
        {
          name: 'Manage Form Template',
          path: '/formtemplate/manage',
          component: ManageFormTemplate
        },
        {
          name: 'Manage Field Template',
          path: '/formtemplate/:templateId/field',
          component: ManageField
        },
        {
          name: 'Manage Program',
          path: '/programme/manage',
          component: ManageProgramme
        },
        {
          name: 'Track Assigment',
          path: '/programme/:programmeId/tutor/:tutorId/trackassignment',
          component: ManageTrackAssigment
        },
        {
          name: 'Manage Phase',
          path: '/programme/:programmeId/phase',
          component: ManagePhase
        },
        {
          name: 'Manage Phase Mentoring',
          path: '/programme/:programmeId/phase/:phaseId/mentoring',
          component: ManagePhaseMentoring
        },
        {
          name: 'Manage Phase Score Recap',
          path: '/programme/:programmeId/phase/:phaseId/scorerecap',
          component: ManagePhaseScoreRecap
        },
        {
          name: 'Manage Phase Scoring',
          path: '/programme/:programmeId/phase/:phaseId/scoring',
          component: ManagePhaseScoring
        },
        {
          name: 'Manage Phase Workshop',
          path: '/programme/:programmeId/phase/:phaseId/workshop',
          component: ManagePhaseWorkshop
        },
        {
          name: 'New Workshop',
          path: '/programme/:programmeId/phase/:phaseId/workshop/new',
          component: NewWorkshop
        },
        {
          name: 'Edit Workshop',
          path: '/programme/:programmeId/phase/:phaseId/workshop/:workshopId',
          component: EditWorkshop
        }
      ]
    },
    {
      name:'Login Personnel',
      path:'/personnel',
      component:LoginPersonnel
    },
    {
      name: 'Personnel Dashboard',
      path:'/personnel/dashb',
      component: personnelDash,
      children: [
        {
          name: 'Dashboard',
          path: '/personnel/dashboard',
          component: personnelDashboard
        },
        {
          name: 'Profile',
          path: '/personnel/profile',
          component: personnelProfile
        },
        {
          name: 'Coordinator Program',
          path: '/coordinator/programme',
          component: CoordinatorProgramme,
          meta: {
            breadcumb: [
              {name: 'Level 1'}
            ]
          }
        },
        {
          name: 'Program Participant',
          path: '/coordinator/programme/:programmeId/participant',
          component: CoordinatorProgrammeParticipant,
          meta: {
            breadcumb: [
              {name: 'Level 1', link: '/coordinator/programme/participant'},
              {name: 'Level 2'}
            ]
          }
        },
        {
          name: 'Team Member',
          path: '/participant/team/:teamId',
          component: ParticipantTeam
        },
        {
          name: 'Team Member Profile',
          path: '/participant/team/talent/:talentId',
          component: ParticipantTeamProfile
        },
        {
          name: 'Participant',
          path: '/tutor/:tutorId/programme/:programmeId/participant',
          component: TutorProgrammeParticipant
        },
        {
          name: 'Participant Main Idea',
          path: '/tutor/:tutorId/participant/:teamId/idea',
          component: TutorProgrammeParticipantIdea
        },
        {
          name: 'Participant Idea',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs',
          component: TutorProgrammeParticipantCS
        },
        {
          name: 'Participant Customer Segment',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona',
          component: TeamPersona
        },
        {
          name: 'Participant Empathy Map',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId',
          component: TeamEmpathyMap
        },
        {
          name: 'Participant Persona',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp',
          component: TeamValueProposition
        },
        {
          name: 'Competitor List',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/competitor',
          component: TeamCompetitor
        },
        {
          name: 'Experiment List',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment',
          component: TeamExperiment
        },
        {
          name: 'Experiment Detailed',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment/:experimentId',
          component: TeamExperimentDetail,
          props: true
        },
        {
          name: 'Business Structure',
          path: '/tutor/:tutorId/participant/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/businessstructure',
          component: TeamBusinessStructure
        },
        {
          name: 'registration',
          path: '/coordinator/programme/:programmeId/registration',
          component: CoordinatorProgrammeRegistration,
          meta: {
            breadcumb: [
              {name: 'Level 1', link: '/coordinator/programme'},
              {name: 'Level 3'}
            ]
          }
        },
        {
          name: 'Phase',
          path: '/coordinator/programme/:programmeId/phase',
          component: CoordinatorProgrammePhase,
          meta: {
            breadcumb: [
              {name: 'Level 1', link: '/coordinator/phase'},
              {name: 'Level 3'}
            ]
          }
        },
        {
          name: 'Phase Mentoring',
          path: '/coordinator/programme/:programmeId/phase/:phaseId/mentoring',
          component: CoordinatorProgrammePhaseMentoring
        },
        {
          name: 'Phase Scoring',
          path: '/coordinator/programme/:programmeId/phase/:phaseId/scoring',
          component: CoordinatorProgrammePhaseScoring
        },
        {
          name: 'Phase Workshop',
          path: '/coordinator/programme/:programmeId/phase/:phaseId/workshop',
          component: CoordinatorProgrammePhaseWorkshop
        },
        {
          name: 'Phase Workshop Reservation',
          path: '/coordinator/programme/:programmeId/phase/:phaseId/workshop/:workshopId/reservation',
          component: CoordinatorProgrammePhaseWorkshopReservation
        },
        {
          name: 'Mentor Program',
          path: '/tutor/programme/',
          component: TutorProgramme
        },
        {
          name: 'Mentor Program Phase',
          path: '/tutor/:tutorId/programme/:programmeId/phase',
          component: TutorProgrammePhase
        },
        {
          name: 'Mentor Program Scoring',
          path: '/tutor/:tutorId/programme/:programmeId/phase/:phaseId/scoring',
          component: TutorProgrammeScoring
        },
        {
          name: 'Mentor Program Scoring - Participant',
          path: '/tutor/:tutorId/programme/:programmeId/phase/:phaseId/scoring/:scoringId/participant/:templateId',
          component: TutorProgrammeScoringParticipant
        },
        {
          name: 'Mentor Program Score',
          path: '/tutor/:tutorId/programme/:programmeId/phase/:phaseId/score',
          component: TutorProgrammeScore
        },
        {
          name: 'Mentor Program Score',
          path: '/tutor/:tutorId/score',
          component: TutorProgrammeScore
        },
        {
          name: 'Mentor Program Mentoring',
          path: '/tutor/:tutorId/mentoring',
          component: TutorProgrammeMentoring
        },
        {
          name: 'Mentor Feedback List',
          path: '/tutor/:tutorId/comment',
          component: TutorProgrammeFeedback
        }
      ]
    },
    {
      name:'login talent',
      path:'/login',
      component:LoginTalent
    },
    {
      name: 'Talent Dashboard',
      path:'/talent/dashb',
      component: talentDash,
      children: [
        {
          name: 'Dashboard',
          path: '/talent/dashboard',
          component: talentDashboard
        },
        {
          name: 'Profil',
          path: '/talent/profile',
          component: talentProfile
        },
        {
          name: 'Kelola Tim',
          path: '/team/:membershipId/manage/:teamId',
          component: TeamManage
        },
        {
          name: 'Buat Tim',
          path: '/talent/team/create',
          component: CreateTeam
        },
        {
          name: 'Keanggotaan Tim',
          path: '/talent/team/membership',
          component: TeamMembership
        },
        {
          name: 'Materi Pembelajaran',
          props: true,
          path: '/learning',
          component: Learning
        },
        {
          name: 'Mencari Peserta',
          path: '/team/:teamId/browse',
          component: TalentBrowse
        },
        {
          path: '/talent/detail/:talentId',
          component: TalentProfileDetail
        },
        {
          name: 'Tim Detil',
          path: '/talent/team/membership/:teamId',
          component: TeamMembershipDetail,
          props: true
        },
        //Team Dashboard as Member
        {
          name: 'Partisipasi Program',
          props: true,
          path: '/team/:teamId/programmeparticipation',
          component: TeamProgrammeParticipation
        },
        {
          //dependen
          name: 'Daftar Program',
          props: true,
          path: '/team/:teamId/programmeparticipation/register',
          component: TeamProgrammeParticipationRegister
        },
        {
          name: 'Sesi Mentoring',
          props: true,
          path: '/team/:teamId/programmeparticipation/:programmeparticipationId/mentoringsession/programme/:programmeId/phase/:phaseId/',
          component: TeamProgrammeParticipationMentoringSession
        },
        {
          name: 'Daftar Sesi Mentoring',
          props: true,
          path: '/team/:teamId/programmeparticipation/:programmeparticipationId/mentoringsession/programme/:programmeId/phase/:phaseId/session',
          component: TeamProgrammeParticipationMentoringSessionList
        },
        {
          name: 'Daftar Mentor',
          props: true,
          path: '/team/:teamId/programmeparticipation/:programmeparticipationId/mentoringsession/programme/:programmeId/phase/:phaseId/session/:sessionId/tutor',
          component: TeamProgrammeParticipationMentoringTutorList
        },
        {
          name: 'Sesi Workshop',
          props: true,
          path: '/team/:teamId/programme/:programmeId/phase/:phaseId/workshop/:programmeparticipationId',
          component: TeamProgrammeParticipationWorkshopSession
        },
        {
          name: 'Daftar Ide',
          path: '/team/:teamId/idea',
          component: TeamIdea
        },
        {
          name: 'Ide',
          path: '/team/:teamId/idea/:ideaId/cs',
          component: TeamCustomerSegment
        },
        {
          name: 'Tipe Pengguna',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona',
          component: TeamPersona
        },
        {
          name: 'Segmen Pelanggan',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId',
          component: TeamEmpathyMap
        },
        {
          name: 'Empathy Map',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp',
          component: TeamValueProposition
        },
        {
          name: 'Kompetitor',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/competitor',
          component: TeamCompetitor
        },
        {
          name: 'Percobaan Bisnis',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment',
          component: TeamExperiment
        },
        {
          name: 'Detil Percobaan',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment/:experimentId',
          component: TeamExperimentDetail,
          props: true
        },
        {
          name: 'Analisa Bisnis',
          path: '/team/:teamId/idea/:ideaId/cs/:customersegmentId/persona/:personaId/vp/:valuepropositionId/businessstructure',
          component: TeamBusinessStructure
        },
        {
          name: 'Upcoming Reservation',
          path: '/talent/team/reservation',
          component: TalentReservation
        },
        {
          name: 'Past Reservation',
          path: '/talent/team/reservation/past',
          component: TalentReservationPast
        },
        {
          name: 'Komentar',
          path: '/team/:teamId/comments',
          component: TalentTeamComments
        }
      ]
    },
    { 
      name: 'Page Not Found',
      path: '*', 
      component: PageNotFound 
    }
]


const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/'})
//  mode: 'history',
//  base: '/beta/'})
//  mode:'history'})
//const router = new VueRouter({routes})  

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if(!authUser || !authUser.token) {
      next({name:'login'})
    }
    else if(to.meta.adminAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if(authUser.data.role_id === 'ADMIN') {
      next()
    }else {
      next('/resident')
    }
  } else if(to.meta.residentAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if(authUser.data.role_id === 'RESIDENT') {
      next()
    }else {
      console.log('Im in admin')
      next('/admin')
    }
  }
  }else {
  next()
  }
})
export default router;
