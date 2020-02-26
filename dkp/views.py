from django.shortcuts import render
from django.http import FileResponse, HttpResponse

def index(request):
    if 'darkmode' not in request.session:
        request.session['darkmode']= ''
    return render(request,'tnt.html')

def dkp_system(request):
    return render(request,'dkp-system.html')

def faq(request):
    return render(request,'faq.html')

def json(request):
    jsonfile = 'dkp/static/LootConfig.json'
    lootconfig=open(jsonfile,'rb')
    response = FileResponse(lootconfig)
    return response

def darkmode(request):
    if request.method == 'GET':
        data = request.GET
        request.session['darkmode']=data['val']
    return HttpResponse('ok')
    