(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const HOME_KEY = 'quakeready-home-v1';
  const PLAN_KEY = 'quakeready-plan-v1';
  const KIT_KEY = 'quakeready-kit-v1';
  const safeRead = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
  const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  $('#year').textContent = new Date().getFullYear();

  const nav = $('#navLinks'), menuToggle = $('#menuToggle');
  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

  const homeChecks = $$('[data-home]');
  const savedHome = safeRead(HOME_KEY, []);
  homeChecks.forEach((input, i) => { input.checked = savedHome.includes(i); input.addEventListener('change', updateHome); });
  function updateHome() {
    const checked = homeChecks.filter(x => x.checked).map(x => Number(x.dataset.home));
    safeWrite(HOME_KEY, checked);
    const pct = Math.round(checked.length / homeChecks.length * 100);
    $('#homeProgressText').textContent = `${checked.length} of ${homeChecks.length} complete`;
    $('#homePercent').textContent = `${pct}%`;
    $('#homeProgressBar').style.width = `${pct}%`;
  }
  updateHome();
  $('#resetHome').addEventListener('click', () => { homeChecks.forEach(x => x.checked = false); updateHome(); });

  const responseCopy = {
    indoors: {n:'01', label:'IF YOU ARE INDOORS', title:'Drop. Cover. Hold on.', points:['Drop to your hands and knees before the shaking knocks you down.','Cover your head and neck under sturdy furniture if available.','Hold on until shaking stops. Stay away from windows and don’t rush outside during shaking.'], note:'Protect your head and neck. If there is no sturdy cover nearby, get low beside an interior wall away from glass.'},
    outdoors: {n:'02', label:'IF YOU ARE OUTDOORS', title:'Move away from hazards.', points:['Move to an open area away from buildings, walls, trees, streetlights and utility wires.','Drop low and protect your head and neck until shaking stops.','Stay clear of damaged structures and overhead hazards afterward.'], note:'Once in a safe open area, stay there until the shaking stops. Watch for falling debris and downed wires.'},
    vehicle: {n:'03', label:'IF YOU ARE IN A VEHICLE', title:'Pull over and stay put.', points:['Pull over in a clear place away from bridges, overpasses, buildings and utility wires.','Set the parking brake and remain in the vehicle until shaking stops.','Proceed cautiously afterward and avoid damaged roads, bridges and downed wires.'], note:'Avoid stopping beneath bridges, trees, signs or power lines. Follow instructions from emergency officials.'},
    after: {n:'04', label:'AFTER SHAKING STOPS', title:'Check, move carefully, stay informed.', points:['Expect aftershocks. If shaking starts again, drop, cover and hold on.','Check for injuries and hazards. Leave a damaged building if you can do so safely.','If you smell gas, avoid flames and electrical switches. Follow official updates and emergency instructions.'], note:'Do not re-enter a visibly damaged building. Contact local emergency services if there is immediate danger.'}
  };
  $$('.response-tab').forEach(btn => btn.addEventListener('click', () => {
    $$('.response-tab').forEach(b => { const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-selected', String(active)); });
    const d = responseCopy[btn.dataset.tab];
    $('#responseContent').innerHTML = `<div class="response-big-number">${d.n}</div><div><span class="response-label">${d.label}</span><h3>${d.title}</h3><ul>${d.points.map(p => `<li>${p}</li>`).join('')}</ul></div><div class="response-side-note"><span>REMEMBER</span><p>${d.note}</p></div>`;
  }));

  const planFields = ['familyName', 'meetingPoint', 'contactName', 'contactPhone'];
  const kitChecks = $$('[data-kit]');
  function getPlan() { return Object.fromEntries(planFields.map(id => [id, $(`#${id}`).value.trim()])); }
  function getKit() { return kitChecks.filter(x => x.checked).map(x => Number(x.dataset.kit)); }
  function renderPlan() {
    const p = getPlan();
    $('#previewName').textContent = p.familyName ? `${p.familyName} readiness plan` : 'Household readiness plan';
    $('#previewMeeting').textContent = p.meetingPoint || 'Not set yet';
    $('#previewContact').textContent = p.contactName ? `${p.contactName}${p.contactPhone ? ' · ' + p.contactPhone : ''}` : 'Not set yet';
    const count = getKit().length, pct = count / kitChecks.length * 100;
    $('#kitCount').textContent = `${count} / ${kitChecks.length}`;
    $('#kitBar').style.width = `${pct}%`;
    $('#kitMessage').textContent = count === kitChecks.length ? 'All listed kit items checked. Review expiry dates and household needs regularly.' : count === 0 ? 'Start checking off the essentials on the left.' : `${kitChecks.length - count} item${kitChecks.length - count === 1 ? '' : 's'} left to check. Adjust the kit for your family’s needs.`;
  }
  const savedPlan = safeRead(PLAN_KEY, {});
  planFields.forEach(id => { $(`#${id}`).value = typeof savedPlan[id] === 'string' ? savedPlan[id] : ''; $(`#${id}`).addEventListener('input', renderPlan); });
  const savedKit = safeRead(KIT_KEY, []);
  kitChecks.forEach((input, i) => { input.checked = savedKit.includes(i); input.addEventListener('change', () => { safeWrite(KIT_KEY, getKit()); renderPlan(); }); });
  renderPlan();
  $('#planForm').addEventListener('submit', e => {
    e.preventDefault();
    const ok1 = safeWrite(PLAN_KEY, getPlan()), ok2 = safeWrite(KIT_KEY, getKit());
    $('#planStatus').textContent = ok1 && ok2 ? 'Plan saved on this device.' : 'Browser storage is unavailable. Use Download a copy instead.';
    renderPlan();
  });
  $('#downloadPlan').addEventListener('click', () => {
    const p = getPlan(), kit = getKit();
    const content = [
      'QUAKEREADY — HOUSEHOLD READINESS PLAN',
      `Generated: ${new Date().toLocaleDateString()}`,
      '', `Household: ${p.familyName || 'Not provided'}`, `Meeting point: ${p.meetingPoint || 'Not set'}`,
      `Out-of-area contact: ${p.contactName || 'Not provided'}`, `Contact phone: ${p.contactPhone || 'Not provided'}`, '',
      'EMERGENCY KIT', ...['Drinking water','Shelf-stable food','Torch and batteries','First-aid supplies','Regular medicines','Copies of key documents','Power bank / charger','Whistle and basic tools'].map((item, i) => `${kit.includes(i) ? '[x]' : '[ ]'} ${item}`), '',
      'REMINDERS', 'During shaking indoors: Drop, Cover, Hold On.', 'After shaking: expect aftershocks, avoid damaged structures, and follow official guidance.',
      'Official India resources:', 'National Center for Seismology: https://seismo.gov.in/dos-and-donts', 'NDMA SACHET: https://sachet.ndma.gov.in/', '',
      'This is a preparedness aid, not a structural inspection, safety certification, or emergency alert service. For immediate danger, contact local emergency services.'
    ].join('\n');
    const blob = new Blob([content], {type:'text/plain;charset=utf-8'}), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'QuakeReady-household-plan.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    $('#planStatus').textContent = 'Your plan download has started.';
  });
})();
