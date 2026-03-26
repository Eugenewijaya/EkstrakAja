# ✅ Deployment Checklist - EkstrakAja

Pre-launch checklist untuk memastikan siap production.

---

## 📋 Pre-Deployment

### Code Quality
- [ ] No console.log() statements left in production code
- [ ] No TypeScript errors (`npm run lint`)
- [ ] All functions have proper error handling
- [ ] No hardcoded values (use constants)
- [ ] No commented-out code
- [ ] All imports are used

### Testing
- [ ] Text extraction works with various image formats
- [ ] Table extraction handles complex tables
- [ ] Sheet generation completes successfully
- [ ] All download formats work (TXT, CSV, XLS)
- [ ] Copy to clipboard works
- [ ] Error states display properly
- [ ] Loading states work correctly
- [ ] Mobile responsiveness verified
- [ ] No console errors in browser
- [ ] No network errors (check DevTools)

### Documentation
- [ ] README.md is complete and accurate
- [ ] QUICKSTART.md has clear instructions
- [ ] docs/SETUP.md covers all steps
- [ ] docs/ARCHITECTURE.md is detailed
- [ ] CONTRIBUTING.md guides contributors
- [ ] CHANGELOG.md is updated

### Security
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.local.example` is committed (no secrets)
- [ ] API key is not hardcoded anywhere
- [ ] `NEXT_PUBLIC_` prefix is appropriate for client access
- [ ] Input validation is in place
- [ ] No sensitive data logged

### Configuration
- [ ] `package.json` has correct versions
- [ ] `next.config.mjs` is production ready
- [ ] `vercel.json` has correct settings
- [ ] `tailwind.config.ts` is optimized
- [ ] `tsconfig.json` has strict mode enabled

---

## 🚀 Deployment Steps

### Step 1: Prepare Vercel
- [ ] Create Vercel account (https://vercel.com)
- [ ] Connect GitHub repository
- [ ] Create new project
- [ ] Select Next.js framework (auto-detected)

### Step 2: Environment Variables
- [ ] Add `NEXT_PUBLIC_GEMINI_API_KEY` to Vercel settings
- [ ] Value is valid Gemini API key
- [ ] No extra spaces or quotes
- [ ] Test locally first with same key

### Step 3: Build Verification
- [ ] Run `npm run build` locally
- [ ] No errors in build output
- [ ] `.next` folder is created
- [ ] Production build is smaller than development

### Step 4: Deploy
- [ ] Push to GitHub (or use Vercel CLI)
- [ ] Check Vercel build logs
- [ ] Deployment completes without errors
- [ ] Preview deployment is accessible

### Step 5: Post-Deployment
- [ ] Visit production URL
- [ ] Test text extraction
- [ ] Test table extraction
- [ ] Test sheet generation
- [ ] Test downloads
- [ ] Check mobile view
- [ ] Check console for errors
- [ ] Check Vercel analytics

---

## 🔍 Pre-Launch QA

### Functionality Testing

#### Text Extraction
- [ ] Upload JPEG image with text
- [ ] Upload PNG image with text
- [ ] Upload WEBP image
- [ ] Extract text works
- [ ] Download TXT file works
- [ ] Copy to clipboard works
- [ ] Error handling works (bad image)

#### Table Extraction
- [ ] Upload table image
- [ ] Extract table works
- [ ] CSV download works
- [ ] Table preview displays correctly
- [ ] Copy to clipboard works
- [ ] Error handling works (no table found)

#### Sheet Generation
- [ ] Template mode works
- [ ] Custom mode works
- [ ] All templates available
- [ ] Formulas display correctly
- [ ] Colors apply properly
- [ ] Font selection works
- [ ] Border option works
- [ ] Excel export works
- [ ] File opens in Excel correctly

### User Experience
- [ ] Landing page loads quickly
- [ ] Buttons are clickable
- [ ] Loading spinners appear
- [ ] Success messages display
- [ ] Error messages are helpful
- [ ] Mobile layout is responsive
- [ ] Desktop layout looks good
- [ ] Animations are smooth
- [ ] No layout shifts

### Performance
- [ ] Page loads in <2 seconds
- [ ] File uploads are fast
- [ ] Extraction completes in <30 seconds
- [ ] No memory leaks (check DevTools)
- [ ] No infinite loops
- [ ] Network requests are efficient

### Compatibility
- [ ] Works in Chrome/Chromium
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile devices
- [ ] Works on tablets
- [ ] API calls use HTTPS

---

## 📊 Monitoring & Alerts

### Setup Monitoring
- [ ] Vercel analytics enabled
- [ ] Error tracking configured (optional)
- [ ] API quota monitoring setup
- [ ] Know how to check Gemini API usage

### Create Runbooks
- [ ] How to check logs
- [ ] How to rollback deployment
- [ ] How to check API quota
- [ ] Who to contact for issues
- [ ] Emergency contacts listed

---

## 📝 Launch Documentation

### Create README for Production
- [ ] System requirements documented
- [ ] How to report bugs
- [ ] How to request features
- [ ] Contact information
- [ ] License information
- [ ] Privacy policy (if applicable)

### Status Page
- [ ] Where to check status
- [ ] How to report issues
- [ ] Response time expectations
- [ ] SLA (if applicable)

---

## 🔐 Production Configuration

### Verify Settings
- [ ] API key has appropriate scope
- [ ] API quotas are sufficient
- [ ] Rate limiting is configured
- [ ] CORS is properly configured (if needed)
- [ ] SSL certificate is valid
- [ ] Domain is correctly configured

### Backup & Recovery
- [ ] Database backups configured (if applicable)
- [ ] Log rotation configured
- [ ] Disaster recovery plan exists
- [ ] Tested rollback procedure

---

## 📱 Device & Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iPhone Safari
- [ ] iPhone Chrome
- [ ] Android Chrome
- [ ] Android Firefox

### Orientations
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Responsive breakpoints correct

---

## ⚡ Performance Checklist

### Frontend Performance
- [ ] Lighthouse score > 90
- [ ] FCP (First Contentful Paint) < 1.5s
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTI (Time to Interactive) < 3s

### Backend Performance
- [ ] API response time < 5s
- [ ] No unhandled promise rejections
- [ ] No memory leaks
- [ ] Efficient database queries (if applicable)

---

## 🎯 Final Checklist

### Day Before Launch
- [ ] All checks above are complete
- [ ] Team is notified
- [ ] Support team is ready
- [ ] Emergency contacts are available
- [ ] Rollback plan is tested

### Launch Day
- [ ] Final smoke test completed
- [ ] Announce deployment
- [ ] Monitor for issues
- [ ] Respond to user feedback quickly
- [ ] Track metrics

### Post-Launch (First Week)
- [ ] Monitor error rates
- [ ] Check user feedback
- [ ] Performance is acceptable
- [ ] No critical issues found
- [ ] Plan iterations based on feedback

---

## 📋 Deployment Configuration Template

```
Environment: Production
Timezone: UTC
Region: Global (Vercel CDN)
Framework: Next.js 14
Runtime: Node.js 18+
Database: None (stateless)
Cache: Vercel Edge Cache
SSL: Automatic (Vercel)
Monitoring: Vercel Analytics
Logging: Vercel Logs
```

---

## ✅ Sign-Off

Before deploying, ensure:

- [ ] All items above are checked
- [ ] Code reviewer approved
- [ ] Product owner approved
- [ ] DevOps/Infrastructure approved
- [ ] Documentation is complete
- [ ] Rollback plan is documented
- [ ] Team is ready to support

**Deployment Date**: _________________

**Deployed By**: _________________

**Reviewed By**: _________________

---

## 📞 Support Contacts

Document for team knowledge:

| Role | Name | Contact |
|------|------|---------|
| Developer | Eugene Wijaya | [contact] |
| DevOps | [Name] | [contact] |
| Support Lead | [Name] | [contact] |
| Manager | [Name] | [contact] |

---

## 🚨 Rollback Procedure

If issues occur after deployment:

1. Assess severity
2. Notify team
3. If critical: Rollback to previous version
4. Investigate root cause
5. Fix and re-test locally
6. Deploy again

**Rollback Command**:
```bash
# Vercel dashboard → Deployments → Select previous → Promote
```

---

## 📈 Post-Launch Metrics

Track these after launch:

- [ ] User count
- [ ] API usage
- [ ] Error rates
- [ ] Performance metrics
- [ ] User feedback
- [ ] Feature usage
- [ ] Cost metrics

---

## ✨ Congratulations!

If all items above are checked, you're ready to launch!

**Status**: ✅ Ready for Production

---

**Last Updated**: 2025-03-26
**Next Review**: [Date after deployment]
